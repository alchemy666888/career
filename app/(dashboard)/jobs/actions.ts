"use server";
import { revalidatePath } from "next/cache";
import { requireActiveUser } from "@/lib/auth/authorization";
import { getDb } from "@/lib/db";
import { importManualJobForUser } from "@/lib/jobs/service";

export async function importManualJobAction(_: unknown, formData: FormData) {
  const user = await requireActiveUser();
  try {
    const result = await importManualJobForUser(getDb(), { userId: user.id, title: String(formData.get("title") ?? ""), company: String(formData.get("company") ?? ""), location: String(formData.get("location") ?? "") || undefined, workStyle: String(formData.get("workStyle") ?? "unknown") as "remote" | "hybrid" | "onsite" | "unknown", salaryMin: String(formData.get("salaryMin") ?? "") || undefined, salaryMax: String(formData.get("salaryMax") ?? "") || undefined, closingDate: String(formData.get("closingDate") ?? "") || undefined, canonicalUrl: String(formData.get("canonicalUrl") ?? "") || undefined, description: String(formData.get("description") ?? "") });
    revalidatePath("/jobs");
    return { ok: true, message: result.duplicate ? "Duplicate warning: saved the existing matching job instead of creating another." : "Manual job imported and saved." };
  } catch {
    return { ok: false, message: "Manual import failed validation. No external URL was fetched." };
  }
}
