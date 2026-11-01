# Cybernetik revision 5

- Reused the existing Site, Worker, dashboard data and request storage.
- Replaced the Google iframe with MapLibre GL JS 5.6.1 and OpenFreeMap Positron. No Google popup or logo; source attribution remains available in the map's attribution control. Google directions remain an optional outbound link.
- Clickable pickup/drop-off pins and four route cards update the selected job and its details. All routes shows the four samples together.
- Road geometries were fetched once from the OSRM public route service and are bundled in public/job-routes.js. These are illustrative routes between approximate street locations, not live dispatch data or truck-specific navigation.
- Replaced the trainer portrait with the Cybernetik C and explicit guided learning: demonstrate, practise, support. Learner portraits remain illustrative.
- Hero is full bleed, sunny, with a North Removals depot sign and revised asphalt texture.

## Reused upstream components
- MapLibre: https://maplibre.org/maplibre-gl-js/docs/ — vendored 5.6.1, license retained in public/vendor/maplibre-LICENSE.txt.
- OpenFreeMap: https://openfreemap.org/quick_start/ and https://openfreemap.org/ — real map data with attribution, no account/key required.
- OSRM: https://project-osrm.org/ — sample road geometry only, no runtime calls.

## Verification
Build and ESM artifact validation passed. Browser verified actual street map rendering, route-card selection, all-route pins and pin-to-job selection. Both training modes show appropriate learning examples. At 1280px there is no horizontal overflow, all preview cards contain their content, and the hero starts at x=0 with viewport width.

## Hero image
AI-generated, not a real company photograph.
Final: public/removals-depot-v5.jpg
Original: /Users/name/.codex/generated_images/01a19566-dcf0-7262-ac4e-106f681e24eb/exec-9dd6370e-0d45-4fb2-831b-40c155d54cef.png
Edit target: public/removals-depot-v4.jpg
Prompt: Edit target: supplied depot image. Preserve the real-world composition, industrial building, three NORTH REMOVALS branded trucks and workers doing their jobs. Make the photograph feel completely candid and real, ordinary high quality commercial documentary photography, not a render. Replace the strange mottled ground with believable dry flat asphalt: fine subtle grey aggregate, a few natural hairline cracks, faint tire wear, a couple of repaired patches, drainage at the building edge, no exaggerated rocky texture or repeated pattern. Make it a clear sunny late morning, natural neutral sunlight and plausible crisp shadows, a pale blue sky with small clouds. No golden hour, no HDR, no gloss, no over-sharpening. Add a professionally mounted modest rectangular NORTH REMOVALS company sign with the same navy geometric cube logo used on the trucks, high on the depot facade above the middle loading bay, aligned to the building perspective. Keep realistic anatomy and natural varied poses. Maintain wide 16:9 composition with foreground usable for website text, no typography overlay except authentic company signage. Photographic imperfections, subtle grain, natural colors, no ornamental plants added.
