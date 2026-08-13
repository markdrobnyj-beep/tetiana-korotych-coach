# Mobile Hero And Gallery Design

## Goal

Keep the blue-suit portrait only in the home-page hero. On screens up to 720px, render the hero text first and the portrait directly below it. Preserve the existing desktop side-by-side layout.

## Design

- Change only the mobile ordering rules in `app/globals.css`: `.hero-copy` comes first and `.hero-visual` second.
- Update `resolveHomeImages()` in `app/lib/site-content.mjs` so `/images/tetiana-blue-portrait-2026.jpg` is removed from the public gallery along with the other excluded portraits.
- Preserve custom admin-uploaded hero and gallery images.
- Cover the gallery filtering behavior with the existing Node tests and the mobile order with the source contract test.

## Success Criteria

- Desktop hero remains text-left/photo-right.
- Mobile hero displays text before the blue-suit photo.
- The blue-suit photo does not appear in the lower gallery.
- Existing tests, lint, and production build pass.
