# Contact Email and Logo Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make contact-form delivery honest and compatible with the configured provider, then reduce the header logo without layout shift.

**Architecture:** Keep the existing `/api/contact` endpoint and delivery helper. Add the website-origin headers required by FormSubmit, preserve strict provider-response checks, log delivery failures, and keep the Resend path ready for production credentials. Size the existing raster logo through fixed responsive CSS dimensions.

**Tech Stack:** React 19, Vinext, Cloudflare Workers, Node test runner, Sites hosting.

## Global Constraints

- Do not add dependencies.
- Return success only after an email provider confirms acceptance.
- Preserve lead storage and existing validation.
- Use fixed logo dimensions on desktop and mobile to prevent layout shift.

---

### Task 1: Email delivery

**Files:**
- Modify: `app/lib/contact-delivery.mjs`
- Modify: `app/api/contact/route.ts`
- Test: `tests/contact-delivery.test.mjs`

**Interfaces:**
- Consumes: `deliverContactEmail(input, runtime, fetcher)`
- Produces: confirmed delivery or a thrown provider error

- [ ] Add a failing test asserting that FormSubmit receives the live site `Origin` and `Referer` headers.
- [ ] Run `npm test` and confirm the new assertion fails.
- [ ] Add the two provider headers and log the caught delivery error without exposing form data.
- [ ] Run `npm test` and confirm all tests pass.

### Task 2: Responsive logo size

**Files:**
- Modify: `app/globals.css`
- Test: `tests/source-contract.test.mjs`

**Interfaces:**
- Consumes: existing `.brand` and `.brand img` markup
- Produces: 168×46 desktop and 128×36 mobile logo boxes

- [ ] Add a failing source-contract test for the new desktop and mobile dimensions.
- [ ] Run `npm test` and confirm it fails.
- [ ] Update only the existing `.brand` dimensions.
- [ ] Run tests and production build.

### Task 3: Publish and verify

**Files:**
- Modify: deployment artifacts only

**Interfaces:**
- Consumes: successful production build
- Produces: deployed Sites version and verified `/api/contact` behavior

- [ ] Commit the validated source.
- [ ] Package, save, and deploy one new version.
- [ ] Submit one diagnostic contact request and inspect production logs.
- [ ] Verify the header at desktop and mobile widths.
