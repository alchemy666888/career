import Link from "next/link";
import { listJobs } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await listJobs();

  return (
    <main className="page">
      <header className="header">
        <div>
          <strong>AI Job Search</strong>
          <h1>Job tracker</h1>
        </div>
        <nav className="nav" aria-label="Jobs navigation">
          <Link href="/">Home</Link>
          <Link className="button primary" href="/jobs/new">Add job</Link>
        </nav>
      </header>

      <section className="job-list">
        {jobs.length === 0 ? (
          <div className="card">
            <h2>No jobs yet</h2>
            <p>Add a job lead to verify the PostgreSQL-backed workflow.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <Link className="job-card" href={`/jobs/${job.id}`} key={job.id}>
              <span className="badge">{job.status}</span>
              <h2>{job.title}</h2>
              <p>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
              {job.fit_score !== null ? <p>Fit score: {job.fit_score}/100</p> : null}
            </Link>
          ))
        )}
      </section>
    </main>
  );
}
