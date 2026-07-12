# Placeholder template only. Configure every key in Vercel Cloud for Preview and Production.
# Do not commit .env, .env.local, production credentials, API keys, or database passwords.

# Runtime environment. Never set Production values in committed files.
NODE_ENV="development"
VERCEL_ENV="development"

# Server-only: pooled PostgreSQL connection string for Vercel/serverless runtime.
DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"

# Server-only: NextAuth/Auth.js signing secret. Generate with `openssl rand -base64 32`.
AUTH_SECRET="replace-with-random-secret"

# Server-only: canonical app URL used by auth callbacks in production/preview.
AUTH_URL="https://your-vercel-project.vercel.app"
# Server-only: set when deploying behind a trusted proxy/host that Auth.js should accept.
AUTH_TRUST_HOST="true"

# Server-only: optional OAuth provider credentials.
AUTH_GITHUB_ID="replace-with-github-client-id"
AUTH_GITHUB_SECRET="replace-with-github-client-secret"

# Server-only: optional AI provider key for evaluation/drafting endpoints.
DEEPSEEK_API_KEY="replace-with-deepseek-api-key"
AI_ENABLED="false"
EMAIL_AUTH_ENABLED="false"
LIVE_JOB_INGESTION_ENABLED="false"
ADMIN_INGESTION_ENABLED="false"
ANONYMOUS_DEMO_ENABLED="true"
SENTRY_ENABLED="false"
OTEL_ENABLED="true"
TEST_DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/ai_job_search_test"
AUTH_GOOGLE_ID="replace-with-google-client-id"
AUTH_GOOGLE_SECRET="replace-with-google-client-secret"
ADMIN_EMAILS="admin@example.com"
RESEND_API_KEY="replace-with-resend-api-key"
EMAIL_FROM="AI Job Search <noreply@example.com>"
CRON_SECRET="replace-with-cron-secret"
SENTRY_DSN="https://public.example@sentry.example/1"
SENTRY_TRACES_SAMPLE_RATE="0.1"

# Client-safe: public application URL when client-side links need an absolute origin.
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Server-only: simple per-window AI rate limit controls.
RATE_LIMIT_WINDOW_SECONDS="60"
RATE_LIMIT_MAX_REQUESTS="10"

### Résumé replacement and deletion behavior

Authenticated users can preview a replacement résumé before confirming it. The preview shows extracted text and a bounded change summary describing which imported résumé source, imported evidence, and imported sections will be archived or replaced. Confirmed replacement runs in a database transaction: prior active résumé sources are archived, source-linked imported evidence is archived, imported résumé sections are replaced, independent user-authored evidence is preserved, completeness is recalculated, and a safe audit event is written.

Users can correct imported claims, which converts the claim into user-approved evidence detached from the résumé source. Deleting a résumé source requires confirmation and clears extracted source text, archives dependent imported evidence, removes imported résumé sections, recalculates completeness, writes an audit event, and excludes the deleted content from future AI context. Original upload bytes are processed transiently and are not stored.

### Job provider and manual-import behavior

Job acquisition uses a provider contract with deterministic mock data, manual entry, and an experimental JobSpy adapter that is disabled unless `LIVE_JOB_INGESTION_ENABLED=true`. Manual import accepts job metadata and description text supplied by the user, normalizes canonical URL metadata for deduplication, stores text-only descriptions, and does not fetch arbitrary user-provided URLs. Duplicate fingerprints reuse the existing normalized job and show a warning instead of corrupting existing records.
