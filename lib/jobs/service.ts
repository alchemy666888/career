import { eq, or } from "drizzle-orm";
import { writeAuditEvent } from "@/lib/audit";
import type { Database } from "@/lib/db";
import { jobPostings, userJobStates } from "@/lib/db/schema";
import { normalizeJob, type NormalizedJobInput } from "./normalize";

export async function importManualJobForUser(db: Database, input: NormalizedJobInput & { userId: string }) {
  const normalized = normalizeJob(input);
  return db.transaction(async (tx) => {
    const duplicate = await tx.query.jobPostings.findFirst({ where: or(eq(jobPostings.contentHash, normalized.contentHash), normalized.canonicalUrl ? eq(jobPostings.canonicalUrl, normalized.canonicalUrl) : eq(jobPostings.contentHash, normalized.contentHash)) });
    const job = duplicate ?? (await tx.insert(jobPostings).values({ source: "manual", provider: "manual", externalId: normalized.fingerprint, canonicalUrl: normalized.canonicalUrl, title: normalized.title, company: normalized.company, location: normalized.location, workStyle: normalized.workStyle, salaryMin: normalized.salaryMin, salaryMax: normalized.salaryMax, currency: normalized.currency, closingDate: normalized.closingDate?.toISOString().slice(0, 10), description: normalized.safeDescription, contentHash: normalized.contentHash }).returning())[0];
    await tx.insert(userJobStates).values({ userId: input.userId, jobId: job.id, status: "saved", savedAt: new Date(), notes: duplicate ? "Duplicate warning: existing normalized job reused." : undefined }).onConflictDoNothing();
    await writeAuditEvent(tx as unknown as Database, { userId: input.userId, action: "admin_action", entityType: "job_posting", entityId: job.id, metadata: { operation: duplicate ? "manual_job_duplicate" : "manual_job_imported", entityId: job.id } });
    return { job, duplicate: Boolean(duplicate) };
  });
}
