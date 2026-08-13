# Editable Compact Testimonials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every testimonial editable through the existing admin editor and shorten testimonial cards on mobile.

**Architecture:** Reuse the existing D1-backed `SiteContent` payload and admin form. Change testimonial normalization so a saved matching record wins over the fallback, expose the normalized list to the admin editor, and tighten mobile CSS.

**Tech Stack:** React 19, TypeScript, CSS, D1, Node.js test runner, vinext.

## Global Constraints

- Keep unlimited add/edit/delete behavior in the current admin form.
- Do not change the D1 schema or add dependencies.
- Preserve desktop styling and the existing public testimonial ID.

---

### Task 1: Preserve saved testimonial edits

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `app/lib/site-content.mjs`

**Interfaces:**
- Consumes: `getPublicTestimonials(items)`.
- Produces: normalized testimonials with the fallback appended only when its ID is absent.

- [ ] Add a test where a saved item with ID `client-business-feedback-2026` has edited name, role, quote, and image.
- [ ] Run `node --test tests/site-content.test.mjs` and verify the old override behavior fails.
- [ ] Replace the fixed override with a presence check and append-only fallback.
- [ ] Remove blank lines from the fallback quote while preserving six bullet lines.
- [ ] Rerun the targeted test and verify it passes.

### Task 2: Expose all public testimonials in admin

**Files:**
- Modify: `tests/source-contract.test.mjs`
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `getSiteContent()` and `getPublicTestimonials()`.
- Produces: `AdminEditor.initialContent.testimonials` containing the fallback when D1 does not yet contain it.

- [ ] Add a contract test requiring the admin page to call `getPublicTestimonials(content.testimonials)`.
- [ ] Run `node --test tests/source-contract.test.mjs` and verify it fails.
- [ ] Import the existing resolver and pass normalized testimonials to `AdminEditor`.
- [ ] Rerun the targeted test and verify it passes.

### Task 3: Compact mobile cards

**Files:**
- Modify: `tests/source-contract.test.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: mobile testimonial styles with smaller padding, author gap, avatar, font size, and line height.

- [ ] Add contract assertions for `padding: 18px`, `margin-bottom: 24px`, avatar `80px`, blockquote `1.16rem`, and line-height `1.22` inside the mobile media query.
- [ ] Run the source contract test and verify it fails.
- [ ] Apply the exact mobile CSS values.
- [ ] Run `npm test`, `npm run build`, and `git diff --check`.

### Task 4: Publish

**Files:**
- No source changes.

- [ ] Commit the verified source.
- [ ] Push `main` to GitHub.
- [ ] Package the verified build, save a Sites version, deploy it publicly, and wait for success.
- [ ] Verify GitHub and Sites point to the new commit/version.
