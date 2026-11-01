# Cybernetik website

Source for https://cybernetik.studio.

## Local development

Use Node.js 24 or newer. Run `npm ci`, `npm run build`, and `npm run dev`, then open http://127.0.0.1:8765.

Run `npm test` for the request-handler tests. The preview uses a local SQLite database in `.local/`; production uses a D1 database.

The site is hosted through Sites. Publishing is separate from this GitHub source backup. Do not commit credentials or local customer data.
