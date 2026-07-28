# Closer — Cold Call Trainer

Practice cold calls **out loud** against an AI prospect for 3 minutes, then get scored by
an AI coach on your opener, discovery, objection handling, and close. Inspired by the
"Cold Call Arena" disco challenge — but built as a free, open-source *practice* tool with
multiple exercises, shuffle, and pick-by-theme.

- **Real-time voice** via **Gemini Live API** (native audio) — free tier friendly.
- **AI judge** via **Gemini Flash** returns a structured 8-criteria scorecard.
- **Accounts via magic link** (passwordless email through **Resend**) — no passwords stored.
- **Cloudflare D1** database for users, exercises, scores and the global leaderboard.
  **R2** (optional) stores profile avatars.
- **Bilingual (English / French)** — UI, the prospect's voice, and the AI coach's
  feedback all follow the chosen language. Toggle EN/FR in the header (saved in-browser).
- **Design system** — the "Closer" theme (Claude Design import) mapped to Tailwind v4
  tokens, with reusable components (`Button`, `Card`, `Chip`, `PersonaAvatar`, …), a shared
  `Header`/`Footer`, and fully translated strings.
- **Next.js (App Router)** deployed to **Cloudflare** (Workers/Pages) via OpenNext.

## Views

- **Arena** (`/`) — search, filter by theme, shuffle, and pick an exercise. Each card shows
  its creator; the built-ins are owned by the admin account ("Closer Team").
- **Exercise / Call** (`/exercise/[id]`, `/call`) — pre-call brief, then the live 3-minute
  voice call. Per-exercise routes are shareable.
- **Scorecard** (`/result`) — score, band, awards, jury verdict, per-skill bars. Saved to
  your account.
- **My Progress** (`/progress`) — real DB-backed stats: calls, average, best, day-streak,
  skill trends and earned badges.
- **Private Training** (`/private`) — paste what *you* sell (website / description / script)
  to run a call on your own domain. **Start** runs an ephemeral call (nothing stored);
  **Save** stores it as a private exercise on your account.
- **Leaderboard** (`/leaderboard`) — best score per user across all exercises.
- **Account** (`/login`, `/onboarding`, `/profile`) — magic-link sign-in, first/last name
  and avatar on first login, editable later.

## How it works (and why it's secure)

```
Browser ──POST /api/token──▶ server builds the prospect persona and mints a short-lived,
                             constraint-LOCKED Gemini ephemeral token (key never leaves server)
Browser ══ direct WebSocket (audio in/out) ══▶ Gemini Live  (uses the ephemeral token)
Browser ──POST /api/judge──▶ server scores the transcript with Gemini 2.5 Flash
```

- `GEMINI_API_KEY` is used **only** on the server. The browser gets a short-lived
  ephemeral token whose `model`, `system_instruction`, and (empty) `tools` are **locked**,
  so a client can't swap the persona or inject tools.
- Prospect/judge prompts stay server-side; only the public "research brief" is shown.
- A small per-IP rate limit on `/api/token` protects the free tier on a public deploy.

## Setup

```bash
npm install
cp .env.example .env.local        # then fill in the values (see below)
```

Fill `.env.local`:

- `GEMINI_API_KEY` — free at <https://aistudio.google.com/apikey>.
- `RESEND_API_KEY` — free at <https://resend.com> (magic-link emails). Left blank in dev,
  the sign-in link is printed to the server console instead.
- `ADMIN_EMAIL` — the email that gets the admin role and owns the built-in exercises.
- `APP_URL` — `http://localhost:3000` in dev.

Create and migrate the D1 database (paste the returned `database_id` into `wrangler.toml`):

```bash
npx wrangler d1 create cold-call-trainer
npx wrangler d1 migrations apply cold-call-trainer            # local dev DB
npx wrangler r2 bucket create cold-call-trainer-avatars       # optional (avatars)
```

The admin user and the built-in exercises are **seeded automatically** on first request.

```bash
npm run dev                       # http://localhost:3000
```

Sign in (magic link), set your name, pick an exercise (or Shuffle), read the brief, hit
**Start call**, allow the microphone, and talk. Hang up (or let the 3:00 timer end) to be
scored — your score lands in **My Progress** and the **Leaderboard**.

## Private context

The repo ships **generic** exercises only. To practice on your own domain, use
**Private Training**: **Start** runs an ephemeral call whose context is sent only to build
that one call (never stored); **Save** stores it as a *private* exercise on your account
(visible only to you). `src/lib/exercises/private/` remains git-ignored for optional
local-only built-in packs.

## Deploy to Cloudflare

```bash
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put RESEND_API_KEY
# set APP_URL / ADMIN_EMAIL / RESEND_FROM as [vars] in wrangler.toml (already scaffolded)
npx wrangler d1 migrations apply cold-call-trainer --remote   # production schema
npm run deploy                                                # OpenNext build + deploy
```

`npm run preview` builds and runs the Cloudflare worker locally.

## Cost

Personal use targets **$0**: Gemini Live + 2.5 Flash free tiers and Cloudflare's free tier.
Heavy public traffic can hit free-tier rate limits (which throttle, not bill); the token
endpoint is rate-limited to help.

## License

MIT.
