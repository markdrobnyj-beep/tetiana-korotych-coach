import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains every public route and protected admin surface", async () => {
  const files = await Promise.all([
    "app/page.tsx",
    "app/pro-mene/page.tsx",
    "app/posluhy/page.tsx",
    "app/vidhuky/page.tsx",
    "app/kontakty/page.tsx",
    "app/admin/page.tsx",
  ].map((path) => readFile(new URL(path, root), "utf8")));
  assert.match(files[0], /Тетяна Коротич/);
  assert.match(files[0], /Тетяна Коротич під час виступу/);
  assert.match(files[1], /Моя місія/);
  assert.match(files[2], /Стратегічні сесії/);
  assert.match(files[3], /Відгуки клієнтів/);
  assert.match(files[4], /Ужгород/);
  assert.match(files[5], /requireCurrentUser/);
});

test("declares durable database and media bindings", async () => {
  const [hostingText, schema] = await Promise.all([
    readFile(new URL(".openai/hosting.json", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
  ]);
  const hosting = JSON.parse(hostingText);
  assert.equal(hosting.d1, "DB");
  assert.equal(hosting.r2, "MEDIA");
  assert.match(schema, /idx_leads_created_at/);
});

test("ships mobile and reduced-motion rules", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /--teal:\s*#103738/i);
});

test("contact endpoint reports delivery failures instead of false success", async () => {
  const [route, form] = await Promise.all([
    readFile(new URL("app/api/contact/route.ts", root), "utf8"),
    readFile(new URL("app/components/ContactForm.tsx", root), "utf8"),
  ]);
  assert.match(route, /deliverContactEmail/);
  assert.match(route, /status:\s*502/);
  assert.match(form, /catch/);
  assert.match(form, /finally/);
});

test("submits activated FormSubmit delivery from the browser before storing the lead", async () => {
  const [route, form] = await Promise.all([
    readFile(new URL("app/api/contact/route.ts", root), "utf8"),
    readFile(new URL("app/components/ContactForm.tsx", root), "utf8"),
  ]);
  assert.match(form, /https:\/\/formsubmit\.co\/ajax\/korotanya@yahoo\.com/);
  assert.match(form, /deliveryConfirmed:\s*"formsubmit"/);
  assert.match(route, /input\.deliveryConfirmed === "formsubmit"/);
});

test("uses the text TK brand and a responsive three-photo gallery", async () => {
  const [page, header, layout, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/components/SiteHeader.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);
  assert.match(page, /управлінні персоналом/);
  assert.match(page, /індивідуально та з командами/);
  assert.match(page, /стратегічні сесії/);
  assert.match(header, /<span>TK<\/span><small>PCC · ICF<\/small>/);
  assert.doesNotMatch(header, /next\/image|tetiana-korotych-logo\.jpg/);
  assert.match(layout, /tetianakorotych\.coach/);
  assert.doesNotMatch(page, /QuestionCards|gallery-item--desktop-hidden/);
  assert.match(css, /\.brand span\s*\{[^}]*border-radius:\s*50%/s);
  assert.match(css, /\.brand small\s*\{[^}]*letter-spacing:/s);
  assert.match(css, /\.testimonial-card blockquote\s*\{[^}]*white-space:\s*pre-line/s);
  assert.match(css, /\.gallery-item img\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(page, /style=\{\{ objectFit: "contain" \}\}/);
  assert.doesNotMatch(css, /\.gallery-item:hover img\s*\{[^}]*scale/);
  assert.doesNotMatch(css, /overflow-x:\s*auto|scroll-snap-type/);
});

test("removes the questions section and all exclusive styles", async () => {
  const [page, css, motion] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/components/MotionController.tsx", root), "utf8"),
  ]);
  assert.doesNotMatch(page, /З чого почнемо|QuestionCards/);
  assert.doesNotMatch(css, /question-section|question-grid|question-card/);
  assert.doesNotMatch(motion, /question-card/);
});

test("uses native anchors for internal navigation on the vinext runtime", async () => {
  const files = await Promise.all([
    "app/page.tsx",
    "app/pro-mene/page.tsx",
    "app/posluhy/page.tsx",
    "app/components/SiteHeader.tsx",
    "app/components/SiteFooter.tsx",
  ].map((path) => readFile(new URL(path, root), "utf8")));

  assert.doesNotMatch(files.join("\n"), /from ["']next\/link["']/);
});

test("renders testimonials with compact round client portraits above the text", async () => {
  const [page, adminPage, css] = await Promise.all([
    readFile(new URL("app/vidhuky/page.tsx", root), "utf8"),
    readFile(new URL("app/admin/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /className="testimonial-avatar"[^>]*width=\{120\}[^>]*height=\{120\}/);
  assert.match(page, /className="testimonial-person"/);
  assert.match(adminPage, /getPublicTestimonials\(content\.testimonials\)/);
  assert.match(css, /\.testimonial-avatar\s*\{[^}]*border-radius:\s*50%/s);
  assert.doesNotMatch(css, /\.testimonial-card\s*\{[^}]*100svh/s);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.testimonial-card\s*\{[^}]*padding:\s*18px/s);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.testimonial-person\s*\{[^}]*margin-bottom:\s*24px/s);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.testimonial-avatar\s*\{[^}]*width:\s*80px;[^}]*height:\s*80px/s);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.testimonial-card blockquote\s*\{[^}]*font-size:\s*1\.16rem;[^}]*line-height:\s*1\.22/s);
});

test("ships desktop readability rules", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /@media \(min-width: 1100px\)/);
  assert.match(css, /body\s*\{\s*font-size:\s*17px/);
});

test("keeps the desktop hero portrait face inside the crop", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(
    css,
    /@media \(min-width: 1100px\)[\s\S]*?\.hero-visual img\s*\{[^}]*object-position:\s*center 18%/,
  );
});

test("keeps animated glass surfaces accessible", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /--glass-light:/);
  assert.match(css, /@keyframes glass-rise/);
  assert.match(css, /backdrop-filter:\s*blur\(28px\) saturate\(1\.3\)/);
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*animation-duration:\s*\.01ms/);
});

test("uses a subtle animated mesh background", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /@keyframes ambient-shimmer/);
  assert.match(css, /body\s*\{[^}]*animation:\s*ambient-shimmer 24s/s);
  assert.match(css, /linear-gradient\(135deg,\s*#e9f5f8,\s*#f4f7f2 48%,\s*#fff1d9\)/);
});

test("uses React Bits ShinyText for the hero name accent", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/components/ShinyText/ShinyText.css", root), "utf8"),
  ]);
  assert.match(page, /import ShinyText from "\.\/components\/ShinyText\/ShinyText"/);
  assert.match(page, /<ShinyText[\s\S]*?text="Коротич"[\s\S]*?speed=\{2\}/);
  assert.match(css, /padding-inline:\s*0 \.09em/);
});

test("uses React Bits ScrollReveal for the home coaching statement", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /import ScrollReveal from "\.\/components\/ScrollReveal\/ScrollReveal"/);
  assert.match(page, /<ScrollReveal[\s\S]*?baseOpacity=\{0\}[\s\S]*?enableBlur=\{true\}[\s\S]*?baseRotation=\{5\}[\s\S]*?blurStrength=\{10\}/);
  assert.match(page, /rotationEnd="bottom 65%"/);
  assert.match(page, /wordAnimationEnd="bottom 65%"/);
});

test("presents service prompts as information instead of numbered choices", async () => {
  const page = await readFile(new URL("app/posluhy/page.tsx", root), "utf8");
  assert.doesNotMatch(page, /0\{index \+ 1\}/);
  assert.match(page, /<ul className="prompt-list"/);
  assert.match(page, /<li key=\{prompt\}>/);
});

test("resets restored scroll and reveals content progressively", async () => {
  const [layout, motion] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/components/MotionController.tsx", root), "utf8"),
  ]);
  assert.match(layout, /<MotionController \/>/);
  assert.match(motion, /history\.scrollRestoration = "manual"/);
  assert.match(motion, /window\.scrollTo\(0, 0\)/);
  assert.match(motion, /IntersectionObserver/);
});
