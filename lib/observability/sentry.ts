import { getServerEnv } from "@/lib/env";
import { redactValue } from "./redact";

export function sanitizeSentryEvent<T extends Record<string, unknown>>(event: T): T {
  return redactValue(event) as T;
}

export async function initSentryServer() {
  const env = getServerEnv();
  if (!env.SENTRY_ENABLED) return;
  const mod = await (new Function("return import('@sentry/nextjs')")() as Promise<{ init?: (options: Record<string, unknown>) => void }>).catch(() => null);
  mod?.init?.({ dsn: env.SENTRY_DSN, sendDefaultPii: false, tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE, beforeSend: sanitizeSentryEvent, replaysSessionSampleRate: 0, replaysOnErrorSampleRate: 0 });
}
