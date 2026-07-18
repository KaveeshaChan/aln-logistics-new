# ALN Member Login — How It Works

This document covers the login system: the `users` table, the PHP
endpoints, and how the React side wires into them. For general deployment
(build + upload to cPanel), see [README.md](README.md) first — this builds
on that same static-export architecture.

## Why PHP instead of Next.js API routes

The site is a static export (`output: "export"` in `next.config.ts`) because
cPanel has no Node.js runtime — see README.md for the full reasoning. That
means literal Next.js `app/api/**/route.ts` files can't run here; there's no
server to execute them. So, same as the quote form's `send-quote.php`,
login is handled by plain PHP scripts under `public/api/` that get copied
into the exported site and run on cPanel's Apache+PHP directly, using
sessions + MySQL instead of Next.js server features.

## Architecture at a glance

```
Browser                          cPanel (Apache + PHP)
┌─────────────────────┐          ┌──────────────────────────┐
│ LoginForm            │  POST   │ /api/login.php            │
│ (src/components/     │ ──────► │  - checks users table     │
│  auth/login-form.tsx)│         │  - password_verify()      │
│                       │ ◄────── │  - starts PHP session     │
└─────────┬─────────────┘  JSON  └──────────┬────────────────┘
          │                                  │ session cookie
          │ every page loads AuthProvider    │ (aln_session)
          ▼                                  ▼
┌─────────────────────┐          ┌──────────────────────────┐
│ AuthProvider          │  GET   │ /api/me.php                │
│ (src/lib/             │──────► │  - reads session           │
│  auth-context.tsx)    │◄────── │  - returns user or 401     │
└─────────┬─────────────┘  JSON  └──────────────────────────┘
          │
          ▼
┌─────────────────────┐
│ AccountContent        │  redirects to /login/ if not authenticated,
│ (src/components/      │  otherwise shows the signed-in dashboard
│  account/account-     │
│  content.tsx)          │
└───────────────────────┘
```

Because this is a static multi-page site (plain `<a>` tags, full page loads
between routes — no client router), there's no persistent JS state to carry
auth across pages. `AuthProvider` re-checks `/api/me.php` on every page
mount instead, using the session cookie as the source of truth. That's also
why page "protection" is client-side only: the static HTML for `/account/`
always loads, and `AccountContent` decides — after the session check
resolves — whether to show the dashboard or redirect to `/login/`. There's
no server available to block the HTML request itself, the way a Node
server-rendered app could.

## One-time setup

### 1. Create the database and table

In cPanel: **MySQL Databases** → create a database and a user, and add that
user to the database with **All Privileges**. Note the exact database name,
username, and password — cPanel usually prefixes them with your account
name (e.g. `cpaneluser_aln`).

Open **phpMyAdmin**, select the new database, go to the **SQL** tab, and run
[`database/schema.sql`](database/schema.sql). This creates one table:

| column       | type                          |
|--------------|-------------------------------|
| `id`         | `INT UNSIGNED AUTO_INCREMENT` |
| `username`   | `VARCHAR(50)`, unique         |
| `password`   | `VARCHAR(255)` (a bcrypt hash, never plaintext) |
| `role`       | `ENUM('Admin', 'User')`       |
| `created_at` | `TIMESTAMP`                   |

### 2. Configure the credentials

```bash
cp public/api/config.example.php public/api/config.php
```

Edit `public/api/config.php` with the real host/dbname/user/pass from step
1. This file is gitignored — it never gets committed — but it does need to
exist locally before `npm run build`, because `next build` copies everything
in `public/` into `out/` verbatim, the same way `send-quote.php` ships
automatically. As long as `public/api/config.php` exists at build time, it's
included in every `out/` you upload.

### 3. Create your first users

There's no signup flow wired up yet — with only a couple of accounts and two
fixed roles, it's simpler (and safer) to add them directly. Generate a
password hash locally:

```bash
php scripts/hash-password.php "the-real-password"
```

Copy the output (starts with `$2y$...`) into an INSERT statement in
phpMyAdmin's SQL tab:

```sql
INSERT INTO users (username, password, role)
VALUES ('admin', '$2y$10$paste-the-hash-here', 'Admin');
```

Repeat with `'User'` as the role for regular member accounts. `scripts/`
is not inside `public/`, so it's never bundled into the deployed site.

## How a login actually happens

1. User submits `LoginForm` (`src/components/auth/login-form.tsx`) →
   calls `login(username, password)` from `useAuth()`.
2. `AuthProvider` (`src/lib/auth-context.tsx`) `POST`s JSON to
   `/api/login.php`.
3. `login.php` looks up the username, runs `password_verify()` against the
   stored hash, and — on success — starts a PHP session (`aln_session`
   cookie, `HttpOnly`, `SameSite=Lax`, `Secure` when served over HTTPS) and
   stores `{id, username, role}` in `$_SESSION["user"]`.
4. On success, the form redirects to `/account/`.
5. `/account/` renders `AccountContent`, which calls `/api/me.php` (via
   `AuthProvider`'s mount effect) to confirm the session and fetch the
   user's role, then shows the dashboard — or redirects to `/login/` if
   there's no valid session.
6. "Log out" calls `/api/logout.php`, which destroys the session, then
   redirects to `/login/`.

## File map

| File | Purpose |
|---|---|
| `database/schema.sql` | `users` table definition — run once in phpMyAdmin |
| `scripts/hash-password.php` | Local CLI to generate a bcrypt hash for seeding users |
| `public/api/config.example.php` | Credential template — copy to `config.php` (gitignored) |
| `public/api/db.php` | Shared PDO/MySQL connection |
| `public/api/session.php` | Shared session-cookie bootstrap |
| `public/api/login.php` | Verifies credentials, starts the session |
| `public/api/me.php` | Returns the current session's user, or 401 |
| `public/api/logout.php` | Destroys the session |
| `src/lib/auth-context.tsx` | React context: `user`, `loading`, `login()`, `logout()` |
| `src/components/auth/login-form.tsx` | Wires the existing login UI to `useAuth()` |
| `src/app/account/page.tsx`, `src/components/account/account-content.tsx` | The protected member dashboard |

## Security notes

- Passwords are hashed with PHP's `password_hash()` (bcrypt) and checked
  with `password_verify()` — never stored or compared as plaintext.
- All queries use PDO prepared statements (no string-concatenated SQL).
- `login.php` returns the same generic error for a wrong password and an
  unknown username, so the endpoint can't be used to enumerate accounts.
- Session cookies are `HttpOnly` (unreachable from JS) and `SameSite=Lax`;
  `Secure` turns on automatically once the site is served over HTTPS.
- `session_regenerate_id(true)` runs on every successful login to prevent
  session fixation.
- **Not included, worth adding if this becomes public-facing beyond a
  handful of known accounts:** login rate limiting / lockout after repeated
  failures, and a CAPTCHA if `login.php` ever gets targeted by bots. With
  only a few known member accounts this is a reasonable initial trade-off,
  not an oversight — revisit if the member base grows.

## What's not built yet

- **Signup.** The `/signup` form and page already exist in the UI but don't
  submit anywhere — by design, matching the "few, manually-added accounts"
  setup above. Wiring it to actually `INSERT` into `users` (defaulting
  `role` to `'User'`) is a small follow-up if self-service registration is
  wanted later.
- **Role-gated content beyond the dashboard.** `/account/` currently just
  shows "you're signed in as Admin/User" — there's no Admin-only panel with
  real functionality yet, since none was requested.
- **Password reset.** The "Forgot password?" link on the login form is
  still a no-op.

## Testing it locally before deploying

You won't have MySQL wired to `next dev` locally unless you set one up, but
you can verify the PHP side in isolation with any local PHP install:

```bash
php -S localhost:8080 -t out   # after `npm run build`, from repo root
```

Then exercise the endpoints directly:

```bash
# Should fail — wrong password
curl -i -X POST http://localhost:8080/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"wrong"}'

# Should succeed and set a session cookie
curl -i -c cookies.txt -X POST http://localhost:8080/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"the-real-password"}'

# Should return the same user, using the cookie from the login above
curl -i -b cookies.txt http://localhost:8080/api/me.php
```

If `config.php` is missing, every endpoint returns a `500` with an explicit
"Missing public/api/config.php" message rather than a cryptic PHP error —
that's the first thing to check if requests fail after a fresh deploy.
