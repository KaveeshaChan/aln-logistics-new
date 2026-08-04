# ALN Member Login — How It Works (Supabase)

This document covers the login system: Supabase Auth, the `profiles` and
`network_members` tables, and how the React side wires into them. For
general deployment (build + upload to cPanel), see
[README.md](README.md) first — this builds on that same static-export
architecture.

## Why Supabase instead of PHP + MySQL

The site is a static export (`output: "export"` in `next.config.ts`) because
cPanel has no Node.js runtime — see README.md for the full reasoning. That
used to mean auth and the network directory had to be served by PHP scripts
under `public/api/`, since literal Next.js `app/api/**/route.ts` files can't
run without a server.

Supabase removes that requirement entirely for data access: the browser
talks directly to Supabase's hosted Auth and REST APIs over HTTPS using the
public **anon key**, and Postgres **Row Level Security (RLS)** policies —
not a backend process — decide what each request is allowed to read or
write. That's exactly the shape a static export needs. `send-quote.php` and
`send-contact.php` are untouched — they only send email, so they still make
sense as plain PHP.

## Architecture at a glance

```
Browser                                    Supabase (hosted)
┌──────────────────────┐   signInWithPassword()   ┌───────────────────────────┐
│ LoginForm             │ ───────────────────────► │ Auth                      │
│ (src/components/      │ ◄─────────────────────── │  - verifies email+password│
│  auth/login-form.tsx) │      session (JWT)        │  - issues a session       │
└─────────┬─────────────┘                           └──────────┬────────────────┘
          │                                                     │
          ▼                                                     ▼
┌──────────────────────┐   select from profiles    ┌───────────────────────────┐
│ AuthProvider          │ ───────────────────────► │ Postgres                  │
│ (src/lib/              │ ◄─────────────────────── │  - profiles (username,role)│
│  auth-context.tsx)    │       role, username       │  - network_members         │
└─────────┬─────────────┘                           │  - RLS policies gate all   │
          ▼                                          │    reads/writes            │
┌──────────────────────┐                             └───────────────────────────┘
│ AccountContent         │  redirects to /login/ if not authenticated,
│ (src/components/       │  otherwise shows the signed-in dashboard
│  account/account-      │
│  content.tsx)           │
└─────────────────────────┘
```

The Supabase JS client persists the session in the browser's `localStorage`
and attaches it to every request automatically, including across full page
loads — so unlike the old PHP-session version, pages don't strictly need a
network round-trip just to know "is there a session at all". `AuthProvider`
still re-fetches the `profiles` row on mount, since the role it returns is
authoritative and RLS enforces it server-side regardless of what the client
believes.

## One-time setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), sign in, and create a new
project (pick any region close to your users). Note the **Project URL** and
the **anon public key** from **Project Settings → Data API / API Keys** —
you'll need both in step 3.

### 2. Run the schema

Open **SQL Editor** in the Supabase Dashboard → **New query**, paste the
contents of [`database/schema.sql`](database/schema.sql), and click **Run**.
This creates:

| table/function            | purpose                                                            |
|----------------------------|---------------------------------------------------------------------|
| `profiles`                 | `id` (matches an `auth.users` id), `username`, `role` (`Admin`/`User`) |
| `network_members`          | the Admin dashboard's network directory                             |
| `get_email_for_username()` | looks up the email for a username so login can accept a username    |
| `is_admin()`                | used by `network_members`'s write policies                          |

Then run [`database/seed-network-members.sql`](database/seed-network-members.sql)
the same way to load the existing directory (89 rows).

### 3. Configure the credentials

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with the Project URL and anon key from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

`.env.local` is gitignored — it never gets committed — but it does need to
exist before `npm run build`, because `NEXT_PUBLIC_*` vars are baked into
the exported JS bundle at build time, the same way `public/api/config.php`
had to exist before the old PHP-based build. Set the same two variables in
any CI environment that runs the build.

### 4. Create your first users

There's no signup flow wired up yet — with only a couple of accounts and two
fixed roles, it's simpler (and safer) to add them directly, same as before:

1. In the Dashboard, go to **Authentication → Users → Add user**. Enter an
   email and password, and check **Auto Confirm User** (there's no email
   step in this flow). Click **Create user** and copy the generated **User
   UID**.
2. In **SQL Editor**, link that user to a username and role:

   ```sql
   INSERT INTO profiles (id, username, role)
   VALUES ('paste-the-user-uid-here', 'admin', 'Admin');
   ```

   Repeat with `'User'` as the role for regular member accounts. The
   `username` is what members type into the login form — the email from
   step 1 is only used internally by Supabase Auth.

## How a login actually happens

1. User submits `LoginForm` (`src/components/auth/login-form.tsx`) → calls
   `login(username, password)` from `useAuth()`.
2. `AuthProvider` (`src/lib/auth-context.tsx`) calls the `get_email_for_username`
   RPC to resolve the username to an email, then
   `supabase.auth.signInWithPassword({ email, password })`.
3. On success, Supabase issues a session (stored in `localStorage`), and
   `AuthProvider` fetches the matching `profiles` row for the username and
   role.
4. The form redirects to `/account/`.
5. `/account/` renders `AccountContent`, which reads `user` from
   `useAuth()` (backed by the steps above) and shows the dashboard, or
   redirects to `/login/` if there's no session.
6. "Log out" calls `supabase.auth.signOut()`, which clears the session, then
   redirects to `/login/`.

## File map

| File | Purpose |
|---|---|
| `database/schema.sql` | `profiles` + `network_members` tables, RLS policies, helper functions — run once in the Supabase SQL Editor |
| `database/seed-network-members.sql` | Loads the existing 89-row network directory |
| `.env.local.example` | Credential template — copy to `.env.local` (gitignored) |
| `src/lib/supabase/client.ts` | Shared browser Supabase client |
| `src/lib/auth-context.tsx` | React context: `user`, `loading`, `login()`, `logout()` |
| `src/lib/network-members.ts` | Type + Supabase CRUD for the network directory |
| `src/components/auth/login-form.tsx` | Wires the existing login UI to `useAuth()` |
| `src/app/account/page.tsx`, `src/components/account/account-content.tsx` | The protected member dashboard |

## Security notes

- Passwords are never handled by this app's own code — Supabase Auth stores
  and verifies them.
- All data access goes through Postgres RLS policies (see
  `database/schema.sql`): any authenticated user can read `network_members`;
  only Admins can insert/update/delete; users can only read their own
  `profiles` row.
- `get_email_for_username` and `is_admin` are `SECURITY DEFINER` functions
  with a locked-down `search_path`, deliberately narrow in what they expose
  (an email for a valid username; a boolean for the current user) — they
  don't give the client broader access to `auth.users` or `profiles`.
- The anon key is meant to be public and ships in the JS bundle; it is safe
  specifically because RLS — not the key — is what enforces access control.
- **Not included, worth adding if this becomes public-facing beyond a
  handful of known accounts:** login rate limiting / lockout after repeated
  failures (Supabase Auth has some built-in protections, but review them),
  and a CAPTCHA if brute-forcing becomes a concern.

## What's not built yet

- **Signup.** The `/signup` form and page already exist in the UI but don't
  submit anywhere — by design, matching the "few, manually-added accounts"
  setup above. Wiring it to call `supabase.auth.signUp()` and insert a
  matching `profiles` row (defaulting `role` to `'User'`) is a small
  follow-up if self-service registration is wanted later.
- **Role-gated content beyond the dashboard.** `/account/` currently just
  shows "you're signed in as Admin/User" — there's no Admin-only panel with
  real functionality yet, since none was requested.
- **Password reset.** The "Forgot password?" link on the login form is
  still a no-op — Supabase Auth supports `resetPasswordForEmail()`, but it
  isn't wired up.
- **Image uploads.** The Add/Edit Member dialog's logo/photo fields still
  only create local preview URLs (`URL.createObjectURL`) — this was true
  before the Supabase migration too. Real uploads would use
  [Supabase Storage](https://supabase.com/docs/guides/storage) buckets, but
  that wasn't part of this migration's scope.

## Testing it locally

```bash
npm run dev
```

Since Supabase is a hosted service, `next dev` talks to your real Supabase
project directly (there's nothing to run locally) — just make sure
`.env.local` is filled in first. Visit `/login/` and sign in with a user
created in step 4 above.

If `.env.local` is missing or incomplete, `src/lib/supabase/client.ts`
throws immediately with an explicit message naming the missing variable(s)
— that's the first thing to check if the app fails to even render.
