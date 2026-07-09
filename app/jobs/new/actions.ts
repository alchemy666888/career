"use server";

import { redirect } from "next/navigation";
import { createJob } from "@/lib/db";

export async function createJobAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!title || !company) {
    throw new Error("Title and company are required.");
  }

  const job = await createJob({ title, company, location, sourceUrl, notes });
  redirect(`/jobs/${job.id}`);
}
