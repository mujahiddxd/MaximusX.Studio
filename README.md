# MaximusX Studio

A responsive video editor portfolio and private content manager, built with React, TypeScript, Vite, and Node's built-in SQLite. The visual system follows the supplied Ember Studio document: warm charcoal surfaces, cream text, terracotta actions, Playfair Display headings, and Source Sans 3 body text.

## Run locally

Requires **Node.js 24 or newer**. No database installation, cloud account, API key, or environment file is needed.

```sh
npm install
npm run dev
```

- Portfolio: http://127.0.0.1:5173
- Admin: http://127.0.0.1:5173/chudaan (also `/admin`)

On the first visit to the admin page, choose your admin ID and a password of at least 12 characters. This is the website's own login, not a third-party connection. First-time setup is only available from a direct localhost connection. There are no default credentials and no public registration.

The database and upload folder are created automatically under `data/` and excluded from Git. Run the app through `npm run dev`, not Vite directly: the Node server provides both the frontend and its database API.

## Manage the portfolio

- **Profile & contact:** studio name, first name, introduction, headline, biography, photo, availability, location, email, phone, and WhatsApp/X links.
- **Short videos / Long videos:** add, edit, reorder, hide, or remove projects; set a thumbnail, video URL, duration, category, and creative context.
- **Clients & creators:** names, images, details, profile links, order, and visibility.
- **Creative contexts:** manage the disciplines shown in the floating navigation switcher. Projects can be assigned to a context. A context must be empty before it can be removed.
- **Page copy:** edit the section headings and descriptions.

**Save draft** stores your work without changing the public portfolio. **Preview draft** opens the most recently saved draft in an authenticated preview. **Publish changes** saves and publishes the current content. Hidden items stay out of the public API. Concurrent edits from another tab are detected before overwriting a saved version.

The included project descriptions, client profiles, and images are illustrative. Sample labels are on by default. Replace them with verified work and contact information, then turn off the sample-content labels. Empty contact fields are hidden; an empty video link opens a descriptive project preview.

## Media

Upload JPG, PNG, or WebP images up to 5 MB, or use HTTPS image URLs. Uploads are stored on the same server. Videos use hosted links: YouTube watch/shorts links, standard Vimeo links, or direct HTTPS MP4/WebM files. Supported players load only after a click. Other HTTPS video links open on their original platform. Embedding depends on the video's availability and owner permissions; an original-link fallback is provided.

## Production

```sh
npm run build
npm start
```

This serves the built site, admin, API, and uploads from http://127.0.0.1:3000. It requires a running Node server with persistent disk storage; a static-only host cannot run the admin database.

For public hosting, first create your administrator locally, then move the `data/` directory along with the application to your Node host. Set these environment variables in the host configuration as appropriate:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` (`5173` in development) | HTTP port |
| `HOST` | `127.0.0.1` | Listener address; use the host's required address behind its reverse proxy |
| `DATA_DIR` | `./data` | Persistent database and uploads directory |
| `PUBLIC_ORIGIN` | Local request origin | Exact public origin, e.g. `https://maximusx.studio`, without a trailing slash |
| `COOKIE_SECURE` | `false` | Set to `true` when serving over HTTPS |

Use HTTPS in production. Setting `PUBLIC_ORIGIN` disables first-time setup over the public site. Configure your reverse proxy to forward to the Node process. The app does not need a MySQL/Postgres server or a remote database connection.

Back up the entire `data/` directory while the app is stopped, including any SQLite sidecar files. Restore it into the same configured data location. Images referenced by old drafts are intentionally retained rather than automatically deleted.

## Security and validation

Passwords are salted and hashed with scrypt. Random session tokens are hashed in the database and sent in HttpOnly, SameSite=Strict cookies with a 12-hour expiry. Write requests require the site's origin; admin endpoints require an active session. Login attempts are rate-limited. Content is validated server-side, links are restricted to HTTPS/local uploads, and image uploads use file signatures and size limits. SQLite files are excluded from both production static serving and Vite development serving.

## Checks

```sh
npm run lint
npm test
```

`npm test` builds the production app and runs integration tests against an isolated temporary SQLite database. Coverage includes authentication, cross-origin protection, draft/publish separation, persistence, concurrent-edit protection, content validation, uploads, logout, throttling, and production serving. Tests never modify `data/`.

## Project structure

- `src/components/Portfolio.tsx`: responsive public portfolio and video/context dialogs
- `src/components/Admin.tsx`: login, editor, upload controls, drafts, and publishing
- `src/studio.css`: Ember design tokens and responsive styles
- `server/app.mjs`: HTTP API, authentication, SQLite, uploads, and production serving
- `server/content.mjs`: initial content and server-side validation
- `server/index.mjs`: one-command development/production entry point
- `server/app.test.mjs`: backend integration tests
