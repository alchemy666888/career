# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js App Router product ("AI Job Search"). Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`, `typecheck`, `test`, `db:generate`, `db:migrate`, `db:check`) and setup is documented in `README.md`. Notes below are the non-obvious bits.

### Environment
- `npm install` (the update script) installs deps. Node 22 is used here.
- Copy `.env.example` to `.env.local` for local dev. `.env.local` is git-ignored and loaded automatically by Next.js and by `drizzle-kit` (via `drizzle.config.ts`). `AUTH_SECRET` must be at least 32 chars (see `lib/config/env.ts`).
- The update script does NOT create `.env.local` or start Postgres; a startup step must do that (see below).

### Database (local Postgres)
- The runtime driver is `@neondatabase/serverless` (`lib/db/index.ts`), but no page/route calls `getDb()` — all pages render from static/mock data. So the dev server, build, lint, typecheck, and tests all run WITHOUT a database.
- A database is only needed to exercise Drizzle migrations. `drizzle-kit migrate` uses the plain `postgres` driver against `DATABASE_URL`, so a standard local Postgres works (Neon is not required for migrations).
- Start local Postgres and create the DB: `sudo pg_ctlcluster 16 main start`, then create role/db (`postgres`/`postgres`, database `ai_job_search`) matching `DATABASE_URL` in `.env.local`.
- Migrations: `db/migrations/0000_initial.sql` is a hand-written reference file and is NOT tracked in a Drizzle journal, so `npm run db:migrate` alone won't apply it. Run `npm run db:generate` first (creates the tracked migration + `db/migrations/meta/`), then `npm run db:migrate`. The generated files are dev artifacts; don't commit them.

### Running / testing
- Dev server: `npm run dev` on http://localhost:3000. Health check: `/api/health` returns `{"ok":true,...}`.
- Core interactive flow (no auth/DB needed): `/jobs` lets you add skills, "Generate AI Matches", and save jobs. Saved jobs are stored in browser `localStorage` (key `careerai-saved`, see `useSavedJobs.ts`) and shown on `/saved`. The `/saved` page briefly flashes an empty state on load before localStorage hydrates — this is expected, not a bug.
- Auth (`next-auth` GitHub provider) is only enabled when `AUTH_GITHUB_ID`/`AUTH_GITHUB_SECRET` are set; it is disabled by default locally.
