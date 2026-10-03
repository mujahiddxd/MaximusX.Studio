import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApplication } from './app.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const dataDir = mkdtempSync(join(tmpdir(), 'maximusx-test-'));
let app, server, origin, cookie, revision, content;
const credentials = { username: 'test-editor', password: 'temporary-test-password-1234' };
async function request(path, { method = 'GET', data, authenticated = false, headers = {}, raw } = {}) {
    const response = await fetch(`${origin}${path}`, { method, headers: { ...(method !== 'GET' ? { Origin: origin, 'Content-Type': 'application/json' } : {}), ...(authenticated ? { Cookie: cookie } : {}), ...headers }, body: raw || (data ? JSON.stringify(data) : undefined) });
    return { status: response.status, headers: response.headers, data: await response.json().catch(() => null) };
}
before(async () => {
    app = createApplication({ root, dataDir });
    server = createServer((req, res) => app.handler(req, res));
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    app.close();
    const target = resolve(dataDir), base = resolve(tmpdir()) + sep;
    if (target.startsWith(base) && target.slice(base.length).startsWith('maximusx-test-'))
        rmSync(target, { recursive: true, force: true });
});
test('public content works and private draft/uploads require authentication', async () => {
    const result = await request('/api/content');
    assert.equal(result.status, 200);
    assert.equal(result.data.projects.length, 6);
    assert.equal((await request('/api/admin/content')).status, 401);
    assert.equal((await request('/api/admin/upload', { method: 'POST', raw: Buffer.from('not an image') })).status, 401);
});
test('setup is protected against cross-origin and proxy requests', async () => {
    assert.equal((await request('/api/auth/setup', { method: 'POST', data: credentials, headers: { Origin: 'https://other.example' } })).status, 403);
    assert.equal((await request('/api/auth/setup', { method: 'POST', data: credentials, headers: { 'X-Forwarded-For': '203.0.113.3' } })).status, 403);
    assert.equal((await request('/api/auth/status')).data.canSetup, true);
});
test('create one admin, hash the password, and issue a protected session', async () => {
    const result = await request('/api/auth/setup', { method: 'POST', data: credentials });
    assert.equal(result.status, 200);
    const setCookie = result.headers.get('set-cookie');
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /SameSite=Strict/);
    cookie = setCookie.split(';')[0];
    assert.equal((await request('/api/auth/status', { authenticated: true })).data.authenticated, true);
    assert.equal((await request('/api/auth/setup', { method: 'POST', data: credentials })).status, 409);
    assert.equal(readFileSync(join(dataDir, 'studio.sqlite')).includes(Buffer.from(credentials.password)), false);
});
test('draft changes are private, survive a reopened database, and reject stale saves', async () => {
    const draft = await request('/api/admin/content', { authenticated: true });
    content = draft.data.content;
    revision = draft.data.revision;
    content.profile.firstName = 'Test editor';
    content.projects[0].visible = false;
    content.creators[0].visible = false;
    const save = await request('/api/admin/content', { method: 'PUT', authenticated: true, data: { content, revision } });
    assert.equal(save.status, 200);
    assert.equal((await request('/api/content')).data.profile.firstName, 'Mizan');
    assert.equal((await request('/api/admin/content', { method: 'PUT', authenticated: true, data: { content, revision } })).status, 409);
    revision = save.data.revision;
    app.close();
    app = createApplication({ root, dataDir });
    assert.equal((await request('/api/admin/content', { authenticated: true })).data.content.profile.firstName, 'Test editor');
});
test('publishing makes edits public and hides disabled projects/creators', async () => {
    const publish = await request('/api/admin/publish', { method: 'PUT', authenticated: true, data: { content, revision } });
    assert.equal(publish.status, 200);
    revision = publish.data.revision;
    const live = (await request('/api/content')).data;
    assert.equal(live.profile.firstName, 'Test editor');
    assert.equal(live.projects.length, 5);
    assert.equal(live.creators.length, 3);
    assert.ok(publish.data.publishedAt);
});
test('validation rejects unsafe links, missing contexts, and malformed fields', async () => {
    for (const modify of [c => { c.profile.xUrl = 'javascript:alert(1)'; }, c => { c.contexts = []; }, c => { c.projects[1].context = 'missing'; }, c => { c.profile.name = ''; }, c => { c.profile.avatar = '/../../data/studio.sqlite'; }, c => { c.profile.whatsapp = 'invalid'; }]) {
        const copy = structuredClone(content);
        modify(copy);
        const result = await request('/api/admin/content', { method: 'PUT', authenticated: true, data: { content: copy, revision } });
        assert.equal(result.status, 400);
    }
});
test('uploads accept image bytes, persist locally, and reject other files', async () => {
    const bad = await request('/api/admin/upload', { method: 'POST', authenticated: true, raw: Buffer.from('<svg onload="alert(1)"></svg>'), headers: { 'Content-Type': 'image/svg+xml' } });
    assert.equal(bad.status, 400);
    const bytes = readFileSync(join(root, 'public', 'avatar.jpg'));
    const uploaded = await request('/api/admin/upload', { method: 'POST', authenticated: true, raw: bytes, headers: { 'Content-Type': 'image/jpeg' } });
    assert.equal(uploaded.status, 201);
    const image = await fetch(`${origin}${uploaded.data.url}`);
    assert.equal(image.headers.get('content-type'), 'image/jpeg');
    assert.deepEqual(Buffer.from(await image.arrayBuffer()), bytes);
    assert.equal((await request('/uploads/not-real.svg')).status, 404);
});
test('logout invalidates the session and login validates credentials', async () => {
    assert.equal((await request('/api/auth/logout', { method: 'POST', authenticated: true })).status, 200);
    assert.equal((await request('/api/admin/content', { authenticated: true })).status, 401);
    assert.equal((await request('/api/auth/login', { method: 'POST', data: { ...credentials, password: 'definitely-wrong-password' } })).status, 401);
    assert.equal((await request('/api/auth/login', { method: 'POST', data: credentials })).status, 200);
});
test('login throttles repeated failures', async () => {
    for (let i = 0; i < 8; i++)
        assert.equal((await request('/api/auth/login', { method: 'POST', data: { ...credentials, password: 'another-wrong-password' } })).status, 401);
    assert.equal((await request('/api/auth/login', { method: 'POST', data: credentials })).status, 429);
});
test('production serves the built site and never serves the database', async () => {
    const response = await fetch(`${origin}/chudaan`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /MaximusX/);
    const hidden = await fetch(`${origin}/data/studio.sqlite`);
    assert.doesNotMatch(hidden.headers.get('content-type'), /sqlite/);
    assert.equal(Buffer.from(await hidden.arrayBuffer()).includes(Buffer.from('SQLite format')), false);
});
