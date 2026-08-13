# Mobile Hero And Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the blue-suit portrait only in the hero and place it below the hero text on mobile.

**Architecture:** Reuse the existing responsive grid and image resolver. Make one CSS order correction and extend the existing gallery exclusion list, without new components or dependencies.

**Tech Stack:** React 19, vinext, CSS, Node test runner

## Global Constraints

- Desktop hero remains unchanged.
- Custom admin-uploaded images remain supported.
- No new dependency or component.

---

### Task 1: Protect the requested behavior

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `tests/source-contract.test.mjs`

**Interfaces:**
- Consumes: `resolveHomeImages(images)`
- Produces: Regression coverage for gallery filtering and mobile hero order.

- [ ] **Step 1: Write failing tests**

Assert that a gallery containing `/images/tetiana-blue-portrait-2026.jpg` excludes it, and that the mobile CSS assigns `.hero-copy` order 1 and `.hero-visual` order 2.

- [ ] **Step 2: Verify failure**

Run `npm test` and confirm the new assertions fail for the current gallery output and mobile order.

### Task 2: Apply the minimal fix

**Files:**
- Modify: `app/lib/site-content.mjs`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Existing `resolveHomeImages(images)` input shape.
- Produces: The same resolved image object shape with the blue-suit portrait excluded from `gallery`.

- [ ] **Step 1: Implement**

Add `/images/tetiana-blue-portrait-2026.jpg` to the resolver exclusion list. Swap mobile orders so `.hero-copy` is `order: 1` and `.hero-visual` is `order: 2`.

- [ ] **Step 2: Verify**

Run `npm test`, `npm run lint`, and `npm run build`; all must exit successfully.

- [ ] **Step 3: Review the diff**

Run `git diff --check` and inspect `git diff` to confirm only the requested behavior changed.
