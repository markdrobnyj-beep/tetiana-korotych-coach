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

test("keeps the blue-suit hero portrait out of the public gallery", () => {
  const legacy = resolveHomeImages({
    hero: "/images/tetiana-wide.avif",
    gallery: ["/images/tetiana-portrait-2026.jpg", "/images/tetiana-speaking.jpg", "/images/tetiana-blue-portrait-2026.jpg"],
  });
  assert.equal(legacy.hero, "/images/tetiana-blue-portrait-2026.jpg");
  assert.deepEqual(legacy.gallery, []);

  const custom = resolveHomeImages({ hero: "/api/media/new-hero", gallery: ["/api/media/new-gallery"] });
  assert.equal(custom.hero, "/api/media/new-hero");
  assert.deepEqual(custom.gallery, ["/api/media/new-gallery"]);
});

test("always includes the provided client testimonial once", () => {
  const testimonials = getPublicTestimonials([]);
  const expectedQuote = `Цінність роботи з Тетяною:
• Чесний і прямий зворотний зв'язок щодо моїх дій та результатів.
• Вміння знайти та сформулювати правильні запитання, які допомагають побачити суть проблеми.
• Спільна розробка чітких планів дій для досягнення власних цілей.
• Можливість поглянути на себе та свою ситуацію збоку.
• Корисні, професійні поради щодо бізнес-кейсів, пов'язаних із командою та партнерами.
• Допомога побачити нові можливості там, де власний погляд уже "замилився".`;
  assert.equal(testimonials.length, 2);
  assert.equal(testimonials[0].image, "/images/client-testimonial-2026.jpg");
  assert.equal(testimonials[0].name, "Олександр Гостєв");
  assert.equal(testimonials[0].role, "Засновник компанії PILLAR");
  assert.equal(testimonials[0].quote, expectedQuote);
  assert.equal(testimonials[0].quote.match(/^• /gm)?.length, 6);
  assert.equal(testimonials[1].image, "/images/maryna-koval.jpg");
  assert.equal(testimonials[1].name, "Марина Коваль");
  assert.equal(testimonials[1].role, "Software Architect");
  assert.match(testimonials[1].quote, /Після 6 сесій:/);
  assert.match(testimonials[1].quote, /повернула радість у своє життя/);
  assert.equal(getPublicTestimonials(testimonials).length, 2);
  const edited = { ...testimonials[0], name: "Олександр Гостєв (ред.)", role: "Оновлена посада", quote: "Оновлений текст" };
  assert.equal(getPublicTestimonials([edited]).length, 2);
  assert.equal(getPublicTestimonials([edited])[0].name, "Олександр Гостєв (ред.)");
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
