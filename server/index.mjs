import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createApplication } from './app.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const dev = process.argv.includes('--dev');
const port = Number(process.env.PORT || (dev ? 5173 : 3000));
const host = process.env.HOST || '127.0.0.1';
const application = createApplication({ root, dataDir: resolve(process.env.DATA_DIR || resolve(root, 'data')), secureCookies: process.env.COOKIE_SECURE === 'true', publicOrigin: process.env.PUBLIC_ORIGIN || '' });
const server = createServer();
let vite;
if (dev) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({ root, server: { middlewareMode: true, ws: { server } }, appType: 'spa' });
}
server.on('request', (req, res) => application.handler(req, res, vite ? () => vite.middlewares(req, res) : undefined));
server.on('error', error => { console.error(error.message); process.exit(1); });
server.listen(port, host, () => console.log(`\n  MaximusX Studio  http://${host}:${port}\n  Admin            http://${host}:${port}/chudaan\n  SQLite is ready. No database configuration needed.\n`));
function shutdown() { server.close(async () => { await vite?.close(); application.close(); process.exit(0); }); }
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
