# Landing page revision

- Slim header, Rubik headings and regular-weight hero copy.
- Removed hero labels, numbered section/step labels, demo footer and redundant operations label.
- Added illustrated application categories flowing into a Cybernetik dashboard; this is an illustration, not a list of live integrations.
- Hero email form posts to `/api/demo-requests`. Requests are stored in the Site's D1 `demo_requests` table, deduplicated by normalized email. This records a request, not a calendar booking. No automatic emails are sent. Use the Sites database tools to retrieve requests; no public read endpoint exists.
- Existing lower contact form remains an email handoff.
- Private access preserved. Local test data stays in ignored `.local/preview.sqlite`.

## Assets

Hero: `public/removals-depot.jpg`, generated with the built-in image tool using the former hero as a style reference. Generated image converted to JPEG for delivery. Illustrative depot, not a customer photograph.

Prompt: Use case: photorealistic-natural. Asset: wide cinematic website hero photograph, 16:9. Reference image is visual style and composition guidance only. Create a removals company depot in the same understated documentary style: a long dark charcoal corrugated warehouse with three loading bays, two unbranded white medium-sized furniture removal box trucks and one unbranded muted rust-brown box truck, parked naturally near the bays. Visible wheeled furniture dollies, folded moving blankets, cardboard moving cartons and wooden storage crates inside the bays. No contractor ladders, no tools, no plumbing, no electrician vans. Quiet depot, no people needed. Soft early morning golden sunlight from right, muted greens and warm grey concrete, realistic architectural photography, natural textures, not glossy CGI. Wide composition with trucks and warehouse in upper two-thirds and uncluttered shaded concrete foreground in lower third for website text. Keep the scene spacious and believable. No text, signage, logos, watermarks or superimposed UI.

Google Sheets, Gmail and Calendar icons: Google gstatic product assets. WhatsApp, HubSpot, Odoo, Excel and Dynamics icons: Simple Icons (https://github.com/simple-icons/simple-icons), with Excel and Dynamics from version 11. Names are used where no verified logo asset was available. Product names and logos identify examples; they do not imply partnerships.

## Validation

Browser: inspected hero and diagram; submitted a local test email and verified the persisted database row. API checks cover valid submission and deduplication, invalid email, cross-origin requests, oversized payload, unavailable database, inaccessible collected emails, and asset serving.
