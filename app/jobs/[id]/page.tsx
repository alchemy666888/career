import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="page">
      <header className="header">
        <div>
          <strong>AI Job Search</strong>
          <h1>{job.title}</h1>
          <p>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
        </div>
        <nav className="nav" aria-label="Job detail navigation">
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
        </nav>
      </header>

      <section className="grid">
        <article className="card">
          <span className="badge">{job.status}</span>
          <h2>Status</h2>
          <p>Current pipeline state for this role.</p>
        </article>
        <article className="card">
          <h2>Fit score</h2>
          <p>{job.fit_score !== null ? `${job.fit_score}/100` : "Not scored yet"}</p>
        </article>
        <article className="card">
          <h2>Source</h2>
          {job.source_url ? <a href={job.source_url}>Open posting</a> : <p>No source URL saved.</p>}
        </article>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h2>Notes</h2>
        <p>{job.notes || "No notes saved yet."}</p>
      </section>
    </main>
  );
}
