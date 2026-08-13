# Header and Testimonial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the text `TK` brand and replace Oleksandr Hostiev's role and testimonial with the approved copy.

**Architecture:** Keep the existing React and CSS structure. Change only the header markup/styles, the fixed testimonial object, and their existing contract tests.

**Tech Stack:** React 19, TypeScript, CSS, Node.js test runner, vinext.

## Global Constraints

- Use Latin `TK` with `PCC · ICF`, matching the former header.
- Use `Засновник компанії PILLAR` exactly.
- Preserve the heading, blank lines, and six `•` bullets in the provided testimonial.
- Do not create a GitHub repository until the user says the result is approved.

---

### Task 1: Restore the text header brand

**Files:**
- Modify: `tests/source-contract.test.mjs`
- Modify: `app/components/SiteHeader.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `.brand` anchor in `SiteHeader`.
- Produces: `<span>TK</span><small>PCC · ICF</small>` styled as the former round mark.

- [ ] **Step 1: Write the failing contract test**

Replace the logo assertions with assertions for `<span>TK</span>`, `PCC · ICF`, no `next/image` import, `.brand span`, and `.brand small`.

- [ ] **Step 2: Verify RED**

Run `node --test tests/source-contract.test.mjs`. Expect the header-brand test to fail because the image logo is still present.

- [ ] **Step 3: Implement the minimal header change**

Remove the image import and replace the image with:

```tsx
<span>TK</span><small>PCC · ICF</small>
```

Restore the former `.brand`, `.brand span`, `.brand small`, and mobile `.brand small` declarations.

- [ ] **Step 4: Verify GREEN**

Run `node --test tests/source-contract.test.mjs`. Expect all tests to pass.

### Task 2: Replace the provided testimonial

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `app/lib/site-content.mjs`

**Interfaces:**
- Consumes: `getPublicTestimonials(items)`.
- Produces: the same testimonial object ID and image, with the approved role and quote.

- [ ] **Step 1: Write the failing data test**

Assert the exact capitalized role and the full approved multiline quote, including six bullet markers.

- [ ] **Step 2: Verify RED**

Run `node --test tests/site-content.test.mjs`. Expect the testimonial test to fail on the old role and quote.

- [ ] **Step 3: Implement the minimal content change**

Update only `PROVIDED_TESTIMONIAL.role` and `PROVIDED_TESTIMONIAL.quote`; use a template literal for the multiline copy.

- [ ] **Step 4: Verify GREEN and the full site**

Run `npm test` and `npm run build`. Expect both commands to exit successfully.

- [ ] **Step 5: Review scope**

Run `git diff --check` and `git diff -- app/components/SiteHeader.tsx app/globals.css app/lib/site-content.mjs tests/source-contract.test.mjs tests/site-content.test.mjs` to confirm no unrelated source changes.
