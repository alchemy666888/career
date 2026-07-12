# AI Job Search

AI Job Search is a Next.js App Router product for an evidence-backed job-hunting journey. The approved `docs/specs/job-hunter-journey` plan evolves the app from fixture-backed demos into a production-capable platform for authenticated job seekers: profile and résumé intake, job discovery, AI fit analysis, résumé tailoring, cover-letter drafting, interview preparation, application tracking, outcomes, administration, and observability.

The current implementation is being delivered incrementally on the `full-job-hunter-journey` branch. Public routes and the existing visual identity should stay functional while server-first, PostgreSQL-backed workflows replace client-only fixture state.

## Product scope

The full MVP described by the specs covers eight job-seeker stages:

1. Registration, authentication, and profile creation.
2. Job discovery, filtering, saving, dismissal, and manual job import.
3. AI job-fit matching with confidence, strengths, gaps, and evidence.
4. Transparent, job-specific résumé optimization with user approval for substantive changes.
5. Personalized cover-letter generation and export.
6. Structured text interview preparation and evaluation.
7. Manual application submission and Kanban tracking.
8. Post-interview feedback, outcome recording, and strategy iteration.

Core principles from the specs:

- English-only UI and generated application materials for the initial release.
- PostgreSQL is the durable source of truth for production journey data.
- Browser-local state is limited to transient UI concerns and isolated demo fixtures.
- AI output must be evidence-backed, traceable, and blocked from final artifacts when unsupported.
- Anonymous demo access, live job ingestion, AI execution, admin ingestion, email auth, Sentry, and OpenTelemetry are controlled by server-side configuration.
- Automated tests must use deterministic fakes and must not call live DeepSeek, OAuth, Resend, Sentry, or JobSpy services.

## Tech stack

- Next.js App Router and React.
- TypeScript.
- Auth.js / NextAuth with database sessions when `DATABASE_URL` is available.
- Drizzle ORM with PostgreSQL.
- Neon serverless runtime driver for app code and `postgres` for Drizzle migration commands.
- Zod for configuration and domain validation.
- Vitest and Testing Library.
- DeepSeek-compatible AI provider abstraction planned by the journey specs.
- Resend-backed email magic links planned behind `EMAIL_AUTH_ENABLED`.
- Sentry and `@vercel/otel` planned behind observability flags.

## Repository map

```text
app/                         Next.js App Router pages, route handlers, and app shell
components/career/           Career journey UI, including current fixture/demo-driven screens
components/ui/               Shared UI shell primitives
lib/auth/                    Auth.js configuration, adapter, authorization helpers
lib/config/, lib/env.ts      Runtime environment parsing and feature flags
lib/db/                      Drizzle client, schema, repositories, transactions
lib/domain/                  Domain services and validation
lib/audit/                   Audit-event allowlists and helpers
lib/background/              PostgreSQL-backed background queue primitives
lib/observability/           Correlation IDs, logging, redaction, tracing, Sentry helpers
lib/rate-limit/, lib/security/ Quotas and rate limiting
scripts/db/                  Safe development reset and seed scripts
db/migrations/               Drizzle migrations and metadata
docs/specs/job-hunter-journey/ Approved requirements, design, task plan, prompt, and implementation log
```

## Prerequisites

- Node.js 22.
- npm.
- PostgreSQL 16 or compatible local/test database when running migrations, seed/reset scripts, or database-backed integration work.
- Vercel project and Neon PostgreSQL database for Preview/Production deployment.
- Optional provider accounts for GitHub OAuth, Google OAuth, DeepSeek, Resend, and Sentry depending on which feature flags are enabled.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment configuration:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` for local development:

   - Set `AUTH_SECRET` to at least 32 random characters, for example with `openssl rand -base64 32`.
   - Use a local `DATABASE_URL` if you plan to run migrations or database-backed flows.
   - Keep external integration flags disabled unless you are intentionally testing a configured provider.

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open <http://localhost:3000>.

The app health endpoint is available at <http://localhost:3000/api/health> and returns an `ok` payload when the route handler is healthy.

## Environment variables

Do not commit `.env`, `.env.local`, production credentials, provider API keys, or database passwords. Configure Preview and Production values in Vercel Cloud.

| Variable | Required when | Notes |
| --- | --- | --- |
| `NODE_ENV` | Always set by runtime | Use `development`, `test`, or `production`; never commit production values. |
| `VERCEL_ENV` | Vercel / safety checks | `production` blocks unsafe reset behavior. |
| `DATABASE_URL` | Database-backed runtime, migrations, Auth.js database sessions | PostgreSQL connection string. In Vercel, use the pooled Neon/serverless connection string. |
| `TEST_DATABASE_URL` | Integration / Playwright database tests | Must point to a non-production test database. Reset scripts reject production-looking targets. |
| `AUTH_SECRET` | Auth enabled | At least 32 characters. Generate with `openssl rand -base64 32`. |
| `AUTH_URL` | Preview/Production auth callbacks | Canonical app URL for Auth.js callbacks. |
| `AUTH_TRUST_HOST` | Trusted Vercel/proxy hosts | Usually `true` on Vercel. |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | GitHub OAuth | Provider is enabled only when both are present. |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Google OAuth | Provider is enabled only when both are present. |
| `EMAIL_AUTH_ENABLED` | Email magic links | Requires `RESEND_API_KEY` and `EMAIL_FROM` when `true`. |
| `RESEND_API_KEY`, `EMAIL_FROM` | Email auth / future email delivery | Keep disabled locally unless testing Resend deliberately. |
| `DEEPSEEK_API_KEY` | AI execution | Required when `AI_ENABLED=true`. |
| `AI_ENABLED` | AI routes/services | Global AI kill switch. Keep `false` for deterministic local and CI runs. |
| `LIVE_JOB_INGESTION_ENABLED` | Live job ingestion | Enables live ingestion only when implemented and configured. |
| `ADMIN_INGESTION_ENABLED` | Admin-triggered ingestion | Requires `CRON_SECRET` when enabled. |
| `ANONYMOUS_DEMO_ENABLED` | Demo mode | Allows anonymous demo access without durable production records. |
| `ADMIN_EMAILS` | Admin access | Comma-separated allowlist used to mark authenticated users as admins. |
| `CRON_SECRET` | Cron / ingestion routes | Shared secret for protected scheduled operations. |
| `SENTRY_ENABLED` | Sentry initialization | Requires `SENTRY_DSN` when `true`. |
| `SENTRY_DSN` | Sentry | Production exception monitoring DSN. |
| `SENTRY_TRACES_SAMPLE_RATE` | Sentry tracing | Numeric sample rate, for example `0.1`. |
| `OTEL_ENABLED` | OpenTelemetry initialization | Enables `@vercel/otel` instrumentation. |
| `NEXT_PUBLIC_APP_URL` | Client-safe absolute URLs | Use `http://localhost:3000` locally. |
| `NEXT_PUBLIC_SITE_URL` | Sitemap canonical origin | Optional; falls back to an example URL if unset. |
| `RATE_LIMIT_WINDOW_SECONDS` | AI / protected action rate windows | Per-window duration. |
| `RATE_LIMIT_MAX_REQUESTS` | AI / protected action rate windows | Max requests inside the window. |

Recommended local defaults for implementation and automated testing:

```env
AI_ENABLED="false"
EMAIL_AUTH_ENABLED="false"
LIVE_JOB_INGESTION_ENABLED="false"
ADMIN_INGESTION_ENABLED="false"
ANONYMOUS_DEMO_ENABLED="true"
SENTRY_ENABLED="false"
OTEL_ENABLED="true"
```

## Database setup

The application uses PostgreSQL for durable production state. Migrations use `drizzle-kit` and the `DATABASE_URL` environment variable.

For local PostgreSQL in this container-style environment:

```bash
sudo pg_ctlcluster 16 main start
sudo -u postgres psql -c "CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres' SUPERUSER;" || true
sudo -u postgres createdb ai_job_search -O postgres || true
sudo -u postgres createdb ai_job_search_test -O postgres || true
```

Then set local URLs similar to:

```env
DATABASE_URL="postgres://postgres:postgres@localhost:5432/ai_job_search"
TEST_DATABASE_URL="postgres://postgres:postgres@localhost:5432/ai_job_search_test"
```

Run migrations and checks:

```bash
npm run db:generate
npm run db:migrate
npm run db:check
```

Safe development helpers:

```bash
npm run db:reset:dev
npm run db:seed:dev
```

Never run reset or destructive scripts against Production. The reset helper refuses `NODE_ENV=production`, `VERCEL_ENV=production`, and production-looking database URLs, but operators are still responsible for verifying the target database first.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js development server. |
| `npm run build` | Build the Next.js app. |
| `npm run start` | Start the built app. |
| `npm run lint` | Run ESLint with zero-warning enforcement. |
| `npm run typecheck` | Run TypeScript with `--noEmit`. |
| `npm test` | Run Vitest tests. |
| `npm run db:generate` | Generate Drizzle migrations. Generated development artifacts should be reviewed before commit. |
| `npm run db:migrate` | Apply Drizzle migrations to `DATABASE_URL`. |
| `npm run db:check` | Validate Drizzle migrations/schema state. |
| `npm run db:reset:dev` | Safely reset a development/test database target. |
| `npm run db:seed:dev` | Seed local development data. |

## Testing and quality gates

Run the standard local gates before committing:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run db:check
```

Database-related tasks should also run the applicable migration command, usually `npm run db:generate` and `npm run db:migrate` against a safe local or test database. End-to-end acceptance tasks in the specs additionally require Playwright once those tests are introduced.

Automated tests should keep live external services disabled and use deterministic fakes/contracts for AI, email, ingestion, OAuth, Sentry, and observability behavior.

## Authentication and authorization

- GitHub OAuth is enabled when `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` are set.
- Google OAuth is enabled when `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are set.
- Email magic-link authentication is enabled only when `EMAIL_AUTH_ENABLED=true` and Resend email settings are configured.
- With `DATABASE_URL`, Auth.js uses the local Drizzle adapter and database sessions; without it, local development can fall back to JWT-backed behavior for routes that do not require persisted users.
- Admin privileges are derived from `ADMIN_EMAILS`; keep this allowlist small and environment-specific.
- Domain services and repositories must enforce owner scoping server-side. Client state is never an authorization boundary.

## AI and evidence controls

The target AI implementation uses a provider-independent interface with DeepSeek as the initial provider. Keep `AI_ENABLED=false` unless a valid provider key and quota controls are configured.

AI features must follow the journey specs:

- Do not invent candidate facts, employers, dates, qualifications, metrics, education, or certifications.
- Every candidate claim used in analysis or generated artifacts must have provenance.
- Imported résumé text is treated as source-backed evidence, but AI-inferred data is not automatically trusted.
- Substantive résumé tailoring changes require individual user acceptance before export.
- Fit scores are honest assessments with confidence and evidence, not objective hiring probabilities.

## Observability and operations

The platform includes structured operational foundations for Vercel deployments:

- Correlation IDs for request and operation tracing.
- Structured logs with privacy redaction.
- Stable safe error codes for user-facing and operational errors.
- Optional Sentry exception monitoring and sampled tracing behind `SENTRY_ENABLED`.
- Optional OpenTelemetry instrumentation through `@vercel/otel` behind `OTEL_ENABLED`.
- PostgreSQL-backed audit events, quota windows, and background-job primitives.

Vercel Runtime Logs are useful for immediate debugging, but durable exception history should be configured through Sentry because the specs target Vercel Cloud Hobby constraints.

## Vercel deployment checklist

1. Create or connect a Vercel project to the repository.
2. Provision Neon PostgreSQL and set `DATABASE_URL` for Preview and Production.
3. Set `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST=true`, and `NEXT_PUBLIC_APP_URL` for each environment.
4. Configure OAuth callback URLs in GitHub and Google provider consoles, then set provider IDs/secrets.
5. Configure Resend and `EMAIL_FROM` before enabling `EMAIL_AUTH_ENABLED`.
6. Configure DeepSeek and rate limits before enabling `AI_ENABLED`.
7. Configure `CRON_SECRET` before enabling live or admin ingestion flags.
8. Configure Sentry DSN and source-map/tracing settings before enabling `SENTRY_ENABLED`.
9. Keep deterministic flags disabled for CI unless a specific integration smoke test is being run.
10. Run migrations against the intended Preview/Production database through a controlled deployment or operator step; do not reset Production automatically.

## Current implementation notes

- Several dashboard routes still use fixture-backed UI while the full job-hunter journey is being migrated incrementally.
- `/profile` has begun moving to server-backed profile data and actions when a database-backed authenticated session is available.
- Saved jobs in the legacy demo flow may still use browser `localStorage` under the `careerai-saved` key until the relevant migration tasks replace it with PostgreSQL state.
- The `/saved` route can briefly show an empty state before local storage hydrates in the legacy flow; this is expected during the transition.

## Troubleshooting

- **`AUTH_SECRET` validation fails:** Generate a longer value with `openssl rand -base64 32` and update `.env.local` or Vercel variables.
- **`npm run db:migrate` cannot connect:** Confirm PostgreSQL is running and `DATABASE_URL` points to a reachable database.
- **Reset script refuses to run:** Verify you are not targeting Production and that `NODE_ENV`, `VERCEL_ENV`, and the database URL are safe for development/test reset behavior.
- **OAuth provider is missing on the sign-in page:** Confirm both the provider ID and secret are set in the active environment.
- **Email sign-in is unavailable:** Confirm `EMAIL_AUTH_ENABLED=true`, `RESEND_API_KEY`, and `EMAIL_FROM`; keep it disabled for normal local tests.
- **AI features are disabled:** Confirm `AI_ENABLED=true`, `DEEPSEEK_API_KEY`, and rate-limit settings; keep disabled in CI unless using deterministic fakes.
- **Sentry is not reporting:** Confirm `SENTRY_ENABLED=true`, `SENTRY_DSN`, and deployment environment settings.
