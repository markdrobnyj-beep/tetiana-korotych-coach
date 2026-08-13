import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_CONTENT,
  NAV_ITEMS,
  validateLead,
  normalizeTestimonials,
  resolveAboutImage,
  resolveHomeImages,
  resolveInstagramUrl,
  getPublicTestimonials,
} from "../app/lib/site-content.mjs";

test("uses five Ukrainian public routes", () => {
  assert.deepEqual(NAV_ITEMS.map((item) => item.label), [
    "Головна",
    "Про мене",
    "Послуги",
    "Відгуки",
    "Контакти",
  ]);
  assert.equal(DEFAULT_CONTENT.settings.email, "korotanya@yahoo.com");
  assert.equal(DEFAULT_CONTENT.settings.city, "Ужгород");
});

test("includes strategic sessions in services", () => {
  assert.match(
    DEFAULT_CONTENT.services.map((service) => service.description).join(" "),
    /стратегічн/i,
  );
});

test("keeps source photos available while the public gallery resolver selects three", () => {
  assert.equal(DEFAULT_CONTENT.images.gallery.length, 5);
  assert.ok(DEFAULT_CONTENT.images.gallery.every((src) => src.startsWith("/images/")));
  assert.ok(!DEFAULT_CONTENT.images.gallery.includes("/images/tetiana-wide.avif"));
});

test("replaces the legacy wide about photo without overriding admin uploads", () => {
  assert.equal(resolveAboutImage("/images/tetiana-wide.avif"), "/images/tetiana-portrait-2026.jpg");
  assert.equal(resolveAboutImage("/api/media/custom-photo"), "/api/media/custom-photo");
});

test("keeps exactly three public gallery photos and preserves later admin uploads", () => {
  const legacy = resolveHomeImages({
    hero: "/images/tetiana-wide.avif",
    gallery: ["/images/tetiana-portrait-2026.jpg", "/images/tetiana-speaking.jpg", "/images/tetiana-blue-portrait-2026.jpg"],
  });
  assert.equal(legacy.hero, "/images/tetiana-blue-portrait-2026.jpg");
  assert.deepEqual(legacy.gallery, ["/images/tetiana-blue-portrait-2026.jpg"]);

  const custom = resolveHomeImages({ hero: "/api/media/new-hero", gallery: ["/api/media/new-gallery"] });
  assert.equal(custom.hero, "/api/media/new-hero");
  assert.deepEqual(custom.gallery, ["/api/media/new-gallery"]);
});

test("always includes the provided client testimonial once", () => {
  const testimonials = getPublicTestimonials([]);
  assert.equal(testimonials.length, 1);
  assert.equal(testimonials[0].image, "/images/client-testimonial-2026.jpg");
  assert.equal(testimonials[0].name, "Олександр Гостєв");
  assert.equal(testimonials[0].role, "засновник компанії PILLAR");
  assert.match(testimonials[0].quote, /Прямий зворотній звʼязок/);
  assert.equal(getPublicTestimonials(testimonials).length, 1);
  const stale = [{ ...testimonials[0], name: "Клієнт Тетяни", role: "Відгук про коучинг" }];
  assert.equal(getPublicTestimonials(stale)[0].name, "Олександр Гостєв");
});

test("upgrades the saved Instagram profile link without replacing a custom profile", () => {
  const workingUrl = "https://www.instagram.com/tanya.korotych_coach?igsh=cGZpdDlpdWMyM2p2&utm_source=qr";
  assert.equal(resolveInstagramUrl("https://www.instagram.com/tanya.korotich_coach"), workingUrl);
  assert.equal(resolveInstagramUrl(workingUrl), workingUrl);
  assert.equal(resolveInstagramUrl("https://www.instagram.com/another.profile"), "https://www.instagram.com/another.profile");
});

test("accepts any number of testimonials without truncating", () => {
  const items = Array.from({ length: 27 }, (_, index) => ({
    id: String(index),
    name: `Клієнт ${index}`,
    role: "",
    quote: "Відгук",
  }));
  assert.equal(normalizeTestimonials(items).length, 27);
});

test("validates contact leads in Ukrainian", () => {
  assert.deepEqual(validateLead({ name: "", email: "bad", message: "" }), {
    ok: false,
    message: "Заповніть ім’я, коректний email і повідомлення.",
  });
  assert.equal(
    validateLead({ name: "Олена", email: "olena@example.com", message: "Вітаю" }).ok,
    true,
  );
});
