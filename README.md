# ALN — Deploying to cPanel (no Node.js)

This is a Next.js 16 (App Router) site. cPanel hosting usually has no Node.js
runtime, so it can't run `next start` directly. This document explains the
approach used to make it deployable anyway, **without rewriting the UI or
animations by hand.**

## TL;DR

Don't hand-convert this to raw HTML/PHP. Next.js can compile the entire app
— every page, every component, every [`motion`](https://motion.dev)
animation — into a folder of plain `.html`/`.css`/`.js` files via **static
export**. Upload that folder to `public_html` and the site runs on any
Apache/PHP host, byte-for-byte the same UI and motion you see in `next dev`,
because it's the exact same compiled React bundle — nothing is
reimplemented. The quote/contact forms' email delivery runs as small PHP
endpoints under `public/`, backed by cPanel's PHP. Member login and the
network directory talk directly to **Supabase** (hosted Postgres + Auth)
from the browser — no PHP or MySQL involved for those anymore.

**Setting up member login?** See [AUTH.md](AUTH.md) — it covers the
Supabase project setup, the database schema, and how the React side wires
into it. This document only covers the general static-export deployment.

## Why not rewrite it as hand-written HTML/PHP?

- **Risk to the thing you explicitly want preserved.** The UI motion here
  (page-load reveals, the animated step form, hover/tap springs, marquees)
  is driven by the `motion` library reacting to React state. Reimplementing
  that in vanilla JS/PHP means re-deriving every animation from scratch —
  high effort, high chance of drift from the current design.
- **It's unnecessary.** This app has no server-only features to strip out —
  no API routes, no Server Actions, no cookies, no dynamic route params, no
  server-side data fetching. Every page is static content. That's exactly
  what static export is designed for.
- **It's a config change, not a rewrite.** See below.

## What changed in this repo to make it exportable

1. **`next.config.ts`** — added:
   - `output: "export"` — tells `next build` to emit static HTML/CSS/JS into
     `out/` instead of building a server.
   - `trailingSlash: true` — so `next build` writes `/about/index.html`
     instead of `/about.html`. Apache serves a folder's `index.html`
     automatically, so routes work with **zero rewrite rules**.
   - `images.unoptimized: true` — Next's on-the-fly image resizing needs a
     Node server, which cPanel doesn't have. This makes `next/image` render
     as a plain `<img>` at original resolution instead — visually identical,
     just without automatic responsive resizing.

2. **`src/components/quote/quote-form.tsx`** — the quote form previously
   didn't send its data anywhere; it just flipped a `submitted` flag, and
   the step 1/2 text inputs were uncontrolled, so their values were actually
   discarded when you moved to the next step (each step unmounts the last).
   Fixed by lifting all field values into state that survives step changes,
   and having the final "Submit request" click `POST` the collected data as
   JSON to `/send-quote.php`.

3. **`public/send-quote.php`** (new) — a small PHP endpoint that validates
   the payload and emails it to `info@autologisticsnetwork.com` (the same
   address as `site.email` in `src/lib/site.ts` — keep them in sync if that
   ever changes). Files in `public/` are copied verbatim to the site root by
   `next build`, so this lands at `https://yourdomain.com/send-quote.php`
   automatically — no separate upload step.

4. **`public/.htaccess`** (new) — tells Apache to serve `404.html` for
   missing pages and disables directory listing. Also copied automatically.

5. **Member login** (new) — `src/lib/supabase/client.ts` + Supabase Auth and
   Postgres (with Row Level Security) power the existing `/login` and
   `/signup`-adjacent auth UI, plus a new `/account` dashboard. This is a
   bigger enough piece that it has its own doc — see [AUTH.md](AUTH.md) for
   the Supabase project setup, the database schema, and how the React side
   wires into it.

Nothing else about the app changed. Every other page, section, and
animation is untouched.

## Prerequisites

- Node.js + npm on **your own machine** (or a CI runner) to run the build.
  Node is never required on the cPanel server — it only produces the static
  files you upload.
- A cPanel hosting plan with PHP (used by `send-quote.php` and
  `send-contact.php`).
- A [Supabase](https://supabase.com) project (used by member login and the
  network directory — see AUTH.md). Its URL and anon key must be set in
  `.env.local` **before** running the build below, since they get baked
  into the static JS bundle at build time.

## Build

```bash
npm install
npm run build
```

This produces an `out/` folder containing the whole site as static files —
open `out/index.html` in a browser and it works with no server at all.

## Deploy to cPanel

1. **Zip the contents of `out/`** (zip the files inside `out/`, not the
   folder itself — the site's `index.html` must be at the zip root).
2. In cPanel, open **File Manager** → your domain's web root (usually
   `public_html`, or `public_html/subfolder` for a subdomain/subdirectory).
3. Upload the zip and use **Extract** to unpack it in place. Alternatively,
   upload over FTP/SFTP with an FTP client (FileZilla, etc.) if you prefer.
4. Confirm `send-quote.php` and `.htaccess` are present at the web root
   alongside `index.html` — the zip extract sometimes nests a folder; if it
   does, move the contents up one level.
5. Visit the site. Test every page and the quote form end to end (see
   checklist below).

### Updating the live site later

Whenever you change the source: `npm run build` again, then re-upload the
new contents of `out/` (overwrite existing files). There's no server-side
build step to run on cPanel — it's a pure file swap. If you want this
automated, a GitHub Action that runs `npm run build` and deploys `out/` via
FTP/SFTP/rsync on every push to `main` removes the manual step entirely —
ask if you'd like that set up.

## Post-deploy checklist

- [ ] Home, About, Services, Membership, Quote pages all load and animate
      the same as in `next dev`.
- [ ] Internal links (`/about`, `/services`, etc.) resolve — since this site
      uses plain `<a>` tags (not `next/link`), navigation is a full page
      load per link, same as any classic static/PHP site.
- [ ] Images load (hero photos, logo, Unsplash service photos).
- [ ] Submit a real test enquiry through `/quote/` and confirm the email
      arrives at `info@autologisticsnetwork.com`.
- [ ] Log in at `/login/` with a seeded account (see AUTH.md) and confirm
      `/account/` shows the right role, and Logout returns you to `/login/`.
- [ ] Visiting a nonexistent URL shows the custom 404 page.
- [ ] HTTPS is enforced (cPanel → **SSL/TLS Status** → "Run AutoSSL", plus
      cPanel's "Force HTTPS Redirect" toggle if available).

## Troubleshooting

- **Blank page / broken styling after upload.** Almost always means the
  site was extracted into a subfolder instead of the web root, so
  `/_next/...` asset paths 404. Move everything up one level so `index.html`
  sits directly in `public_html`.
- **Quote form shows the "something went wrong" message.** Open the
  browser's Network tab on `/quote/`, submit, and check the response from
  `send-quote.php`:
  - `422` — a required field was empty (surfaces `"error": "Missing field: …"`).
  - `502` — PHP's `mail()` returned false. Shared-host `mail()` is sometimes
    unreliable or lands in spam; if this happens consistently, swap the
    `mail()` call in `public/send-quote.php` for
    [PHPMailer](https://github.com/PHPMailer/PHPMailer) configured with your
    cPanel account's SMTP credentials (Email → Connect Devices in cPanel).
- **Form gets spammed.** `send-quote.php` has no bot protection by design
  (kept minimal). If spam becomes a problem, add a honeypot field or
  hCaptcha/Turnstile check before the `mail()` call.
- **Fonts/animations look different than `next dev`.** They shouldn't — the
  exported bundle is the same production build Vercel would serve. If
  something looks off, hard-refresh (cached old assets under `/_next/`) or
  confirm the upload wasn't partial.

## If your cPanel host actually does support Node.js

Worth double-checking before assuming static export is required: many
cPanel installs include **"Setup Node.js App"** (via Phusion Passenger)
under the Software section. If yours does, you could run the full Next.js
server (`next start`) instead — no static-export trade-offs (image
optimization, no Server Actions, etc. all "just work"). If it's not listed
in your cPanel, or your host confirms no Node.js, the static export
approach above is the right call.
