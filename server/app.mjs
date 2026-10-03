import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { initialContent, validateContent, publicContent } from './content.mjs';
const derive = promisify(scrypt);
const digest = value => createHash('sha256').update(value).digest('hex');
const fail = (message, status = 400) => Object.assign(new Error(message), { status });
const mime = { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
export function createApplication({ dataDir, root, secureCookies = false, publicOrigin = '', allowSetup = true }) {
    mkdirSync(join(dataDir, 'uploads'), { recursive: true });
    const db = new DatabaseSync(join(dataDir, 'studio.sqlite'));
    db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY CHECK(id=1), username TEXT NOT NULL, salt TEXT NOT NULL, password TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS content (id INTEGER PRIMARY KEY CHECK(id=1), draft TEXT NOT NULL, published TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, published_at TEXT);
  `);
    const seed = JSON.stringify(initialContent);
    db.prepare('INSERT OR IGNORE INTO content(id,draft,published,revision) VALUES(1,?,?,1)').run(seed, seed);
    const attempts = new Map();
    const cookie = (token, age = 43200) => `studio_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secureCookies ? '; Secure' : ''}`;
    function session(req) {
        const token = (req.headers.cookie || '').split(';').map(c => c.trim()).find(c => c.startsWith('studio_session='))?.slice(15);
        if (!token || !/^[a-f0-9]{64}$/.test(token))
            return null;
        return db.prepare('SELECT token FROM sessions WHERE token=? AND expires>?').get(digest(token), Date.now());
    }
    function issueSession(res) {
        db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
        const token = randomBytes(32).toString('hex');
        db.prepare('INSERT INTO sessions(token,expires) VALUES(?,?)').run(digest(token), Date.now() + 43200000);
        res.setHeader('Set-Cookie', cookie(token));
    }
    function json(res, status, data) {
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(data));
    }
    async function body(req, limit = 1024 * 1024, raw = false) {
        if (Number(req.headers['content-length']) > limit)
            throw fail('File or request is too large.', 413);
        const chunks = [];
        let size = 0;
        for await (const chunk of req) {
            size += chunk.length;
            if (size > limit)
                throw fail('File or request is too large.', 413);
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        if (raw)
            return buffer;
        if (!req.headers['content-type']?.startsWith('application/json'))
            throw fail('Send JSON content.', 415);
        try {
            return JSON.parse(buffer.toString());
        }
        catch {
            throw fail('Invalid JSON.');
        }
    }
    function credentials(input) {
        if (typeof input?.username !== 'string' || !/^[a-zA-Z0-9_.@-]{3,80}$/.test(input.username.trim()))
            throw fail('Use an admin ID of 3–80 letters, numbers, or . _ @ -');
        if (typeof input.password !== 'string' || input.password.length < 12 || input.password.length > 200)
            throw fail('Use a password between 12 and 200 characters.');
        return { username: input.username.trim(), password: input.password };
    }
    const state = () => db.prepare('SELECT * FROM content WHERE id=1').get();
    const localRequest = req => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress) && /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(req.headers.host || '') && !req.headers['x-forwarded-for'] && !req.headers.forwarded && !publicOrigin;
    async function handler(req, res, next) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('X-Frame-Options', 'DENY');
        let path;
        try {
            path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        }
        catch {
            return json(res, 400, { error: 'Invalid URL.' });
        }
        if (!path.startsWith('/api/')) {
            if (path.startsWith('/uploads/')) {
                if (!/^\/uploads\/[a-f0-9-]+\.(jpg|png|webp)$/.test(path))
                    return json(res, 404, { error: 'Image not found.' });
                const file = join(dataDir, path.slice(1));
                if (!existsSync(file))
                    return json(res, 404, { error: 'Image not found.' });
                if (!['GET', 'HEAD'].includes(req.method))
                    return json(res, 405, { error: 'Method not allowed.' });
                res.writeHead(200, { 'Content-Type': mime[extname(file)], 'Cache-Control': 'public, max-age=31536000, immutable' });
                return res.end(req.method === 'HEAD' ? undefined : readFileSync(file));
            }
            if (next)
                return next();
            if (!['GET', 'HEAD'].includes(req.method))
                return json(res, 405, { error: 'Method not allowed.' });
            const dist = resolve(root, 'dist');
            let file = resolve(dist, `.${path}`);
            if (!file.startsWith(dist + sep))
                file = join(dist, 'index.html');
            if (!existsSync(file) || !extname(file))
                file = join(dist, 'index.html');
            if (!existsSync(file))
                return json(res, 503, { error: 'Build the site with npm run build first.' });
            try {
                const bytes = readFileSync(file);
                res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': file.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache' });
                return res.end(req.method === 'HEAD' ? undefined : bytes);
            }
            catch {
                return json(res, 404, { error: 'Not found.' });
            }
        }
        try {
            if (!['GET', 'HEAD'].includes(req.method)) {
                const expected = publicOrigin || `${secureCookies ? 'https' : 'http'}://${req.headers.host}`;
                if (req.headers.origin !== expected || req.headers['sec-fetch-site'] === 'cross-site')
                    throw fail('This request must come from the studio website.', 403);
            }
            if (path === '/api/content' && req.method === 'GET')
                return json(res, 200, publicContent(JSON.parse(state().published)));
            if (path === '/api/auth/status' && req.method === 'GET') {
                const admin = db.prepare('SELECT username FROM admin WHERE id=1').get();
                return json(res, 200, { authenticated: !!session(req), needsSetup: !admin, canSetup: !admin && allowSetup && localRequest(req) });
            }
            if (['/api/auth/setup', '/api/auth/login'].includes(path) && req.method === 'POST') {
                const key = req.socket.remoteAddress;
                const now = Date.now();
                for (const [ip, item] of attempts)
                    if (item.until < now)
                        attempts.delete(ip);
                const attempt = attempts.get(key) || { count: 0, until: now + 900000 };
                if (attempt.count >= 8)
                    throw fail('Too many attempts. Please try again in 15 minutes.', 429);
                attempt.count++;
                attempts.set(key, attempt);
                const { username, password } = credentials(await body(req));
                const admin = db.prepare('SELECT * FROM admin WHERE id=1').get();
                if (path.endsWith('/setup')) {
                    if (admin)
                        throw fail('An administrator already exists.', 409);
                    if (!allowSetup || !localRequest(req))
                        throw fail('Create your administrator on localhost before deploying.', 403);
                    const salt = randomBytes(16).toString('hex');
                    const hash = (await derive(password, salt, 64)).toString('hex');
                    try {
                        db.prepare('INSERT INTO admin VALUES(1,?,?,?)').run(username, salt, hash);
                    }
                    catch {
                        throw fail('An administrator already exists.', 409);
                    }
                }
                else {
                    const hash = await derive(password, admin?.salt || 'unknown-admin-salt', 64);
                    if (!admin || username !== admin.username || !timingSafeEqual(hash, Buffer.from(admin.password, 'hex')))
                        throw fail('Admin ID or password is incorrect.', 401);
                }
                attempts.delete(key);
                issueSession(res);
                return json(res, 200, { ok: true });
            }
            const currentSession = session(req);
            if (!currentSession)
                throw fail('Please sign in to continue.', 401);
            if (path === '/api/auth/logout' && req.method === 'POST') {
                db.prepare('DELETE FROM sessions WHERE token=?').run(currentSession.token);
                res.setHeader('Set-Cookie', cookie('', 0));
                return json(res, 200, { ok: true });
            }
            if (path === '/api/admin/content' && req.method === 'GET') {
                const value = state();
                return json(res, 200, { content: JSON.parse(value.draft), revision: value.revision, publishedAt: value.published_at });
            }
            if (['/api/admin/content', '/api/admin/publish'].includes(path) && req.method === 'PUT') {
                const input = await body(req);
                let value;
                try {
                    value = validateContent(input.content);
                }
                catch (e) {
                    throw fail(e.message);
                }
                if (!Number.isInteger(input.revision))
                    throw fail('A content revision is required.');
                const serialized = JSON.stringify(value);
                const publishing = path.endsWith('/publish');
                const publishedAt = new Date().toISOString();
                const result = publishing
                    ? db.prepare('UPDATE content SET draft=?, published=?, revision=revision+1, published_at=? WHERE id=1 AND revision=?').run(serialized, serialized, publishedAt, input.revision)
                    : db.prepare('UPDATE content SET draft=?, revision=revision+1 WHERE id=1 AND revision=?').run(serialized, input.revision);
                if (!result.changes)
                    throw fail('This content was updated in another tab. Reload before saving.', 409);
                return json(res, 200, { revision: input.revision + 1, publishedAt: state().published_at });
            }
            if (path === '/api/admin/upload' && req.method === 'POST') {
                const buffer = await body(req, 5 * 1024 * 1024, true);
                let extension;
                if (buffer.length > 12 && buffer.subarray(0, 3).equals(Buffer.from([255, 216, 255])))
                    extension = 'jpg';
                if (buffer.length > 24 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
                    extension = 'png';
                if (buffer.length > 16 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP')
                    extension = 'webp';
                if (!extension)
                    throw fail('Upload a JPG, PNG, or WebP image under 5 MB.');
                const name = `${randomUUID()}.${extension}`;
                await writeFile(join(dataDir, 'uploads', name), buffer, { flag: 'wx' });
                return json(res, 201, { url: `/uploads/${name}` });
            }
            return json(res, 404, { error: 'Endpoint not found.' });
        }
        catch (error) {
            if (!error.status)
                console.error(error);
            if (!res.headersSent)
                json(res, error.status || 500, { error: error.status ? error.message : 'Something went wrong. Please try again.' });
        }
    }
    return { handler, close: () => db.close() };
}
