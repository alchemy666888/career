export async function register() {
  if (process.env.OTEL_ENABLED !== "false") {
    const otel = await (new Function("return import('@vercel/otel')")() as Promise<{ registerOTel?: (options: { serviceName: string }) => void }>).catch(() => null);
    otel?.registerOTel?.({ serviceName: "ai-job-search" });
  }
  if (process.env.SENTRY_ENABLED === "true") await import("./lib/observability/sentry").then((m) => m.initSentryServer());
}

export async function onRequestError(error: unknown) {
  const sentry = await (new Function("return import('@sentry/nextjs')")() as Promise<{ captureException?: (error: unknown) => void }>).catch(() => null);
  sentry?.captureException?.(error);
}
