import Link from "next/link";
import { createJobAction } from "./actions";

export default function NewJobPage() {
  return (
    <main className="page">
      <header className="header">
        <div>
          <strong>AI Job Search</strong>
          <h1>Add job</h1>
        </div>
        <nav className="nav" aria-label="Add job navigation">
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
        </nav>
      </header>

      <section className="card">
        <form action={createJobAction} className="form">
          <div className="field">
            <label htmlFor="title">Role title</label>
            <input id="title" name="title" required placeholder="Senior Frontend Engineer" />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" required placeholder="Example A/S" />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" placeholder="Copenhagen / Remote" />
          </div>
          <div className="field">
            <label htmlFor="sourceUrl">Posting URL</label>
            <input id="sourceUrl" name="sourceUrl" type="url" placeholder="https://example.com/jobs/123" />
          </div>
          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={6} placeholder="Paste posting summary, fit notes, or next actions." />
          </div>
          <button className="button primary" type="submit">Save job</button>
        </form>
      </section>
    </main>
  );
}
