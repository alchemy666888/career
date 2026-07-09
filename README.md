# AI Job Search

A pure Next.js application for AI-assisted job search workflows. The app is ready for Vercel deployment and uses PostgreSQL for persistent job and application tracking.

## Stack

- Next.js App Router
- React Server Components and Server Actions
- PostgreSQL via `pg` locally and `@vercel/postgres` on Vercel
- TypeScript
- Vercel-ready configuration

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a PostgreSQL database and copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

3. Update `DATABASE_URL` in `.env.local`.

4. Run the database schema:

   ```bash
   npm run db:migrate
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Vercel deployment

1. Import this repository into Vercel.
2. Add a Vercel Postgres database or configure an external PostgreSQL `DATABASE_URL`.
3. Run `npm run db:migrate` against the production database before first use.
4. Deploy with the default Next.js build command:

   ```bash
   npm run build
   ```

## Spec-driven development

The project includes spec documents for future AI-assisted implementation:

- `requirements.md`
- `design.md`
- `tasks.md`
- `codex-prompt.md`
