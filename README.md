# Tetiana Korotych — Coaching Website

A Ukrainian-language coaching website for Tetiana Korotych, a Professional
Certified Coach (PCC) with the International Coaching Federation (ICF). The
site presents life coaching, business coaching, strategic sessions, client
testimonials, contact options, and an Uzhhorod location map.

## Features

- Responsive React website with Ukrainian public copy.
- Pages for the home page, about, services, testimonials, and contacts.
- Calendly booking widget and a contact form with server-side delivery.
- Editable site content and media through the protected `/admin` area.
- Cloudflare D1 storage and R2 media bindings for the hosted version.
- Accessible navigation, responsive layouts, and reduced-motion support.

## Tech stack

- React and TypeScript
- [vinext](https://github.com/cloudflare/vinext) and Vite
- Cloudflare Workers / Sites
- Drizzle ORM with Cloudflare D1
- Node.js built-in test runner

## Requirements

- Node.js `>=22.13.0`
- npm

## Getting started

```bash
npm install
npm run dev
```

The development server starts the site locally. The public routes are:

- `/`
- `/pro-mene` — about
- `/posluhy` — services
- `/vidhuky` — testimonials
- `/kontakty` — contact

The `/admin` route is protected by the hosting identity headers and the
`ADMIN_EMAILS` environment variable. Do not commit production credentials or
tokens.

## Useful commands

```bash
npm run dev          # start local development
npm run build        # build the vinext application
npm start            # start the production build
npm test             # run the test suite
npm run lint         # run ESLint
npm run db:generate  # generate Drizzle migrations after schema changes
```

## Cloudflare configuration

`.openai/hosting.json` declares the hosted D1 database and R2 media bindings.
`vite.config.ts` provides local development shims for these bindings. The
project does not use `wrangler.jsonc`; deployment configuration is supplied by
the hosting environment.

## Project structure

```text
app/                  # routes, components, APIs, and site content
public/               # images and static assets
db/                   # Drizzle database setup
examples/d1/           # optional D1 example surface
tests/                 # Node.js contract and behavior tests
worker/                # hosted worker entry point
```
