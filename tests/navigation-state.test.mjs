import assert from "node:assert/strict";
import test from "node:test";

import { shouldRedirectFirstEntry } from "../app/lib/navigation-state.mjs";

test("redirects a direct first entry on an inner page to home", () => {
  assert.equal(shouldRedirectFirstEntry({ pathname: "/vidhuky", referrer: "", origin: "https://coach.test" }), true);
  assert.equal(shouldRedirectFirstEntry({ pathname: "/posluhy", referrer: "https://instagram.com/", origin: "https://coach.test" }), true);
});

test("keeps home and intentional internal navigation available", () => {
  assert.equal(shouldRedirectFirstEntry({ pathname: "/", referrer: "", origin: "https://coach.test" }), false);
  assert.equal(shouldRedirectFirstEntry({ pathname: "/vidhuky", referrer: "https://coach.test/", origin: "https://coach.test" }), false);
});
