import Link from "next/link";

const features = [
  "Track PostgreSQL-backed job leads and applications",
  "Prepare AI-assisted CV and cover letter drafts",
  "Deploy directly to Vercel as a pure Next.js app"
];

export default function HomePage() {
  return (
    <main className="page">
      <header className="header">
        <strong>AI Job Search</strong>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/jobs">Jobs</Link>
          <Link href="/jobs/new">Add job</Link>
          <Link href="/api/health">Health</Link>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="badge">Next.js + PostgreSQL + Vercel</span>
          <h1>Manage your AI-assisted job search from one deployable app.</h1>
          <p>
            Save promising roles, track application status, and keep the system ready for future AI drafting,
            ranking, and interview preparation workflows.
          </p>
          <div className="nav">
            <Link className="button primary" href="/jobs/new">Add your first job</Link>
            <Link className="button" href="/jobs">View job tracker</Link>
          </div>
        </div>
        <div className="card">
          <h2>Built for production</h2>
          <p>
            The app uses the Next.js App Router, server actions, PostgreSQL schema migrations, and Vercel-friendly
            environment configuration.
          </p>
        </div>
      </section>

      <section className="grid" aria-label="Feature summary">
        {features.map((feature) => (
          <article className="card" key={feature}>
            <h2>{feature}</h2>
            <p>Ready as a foundation for spec-driven development and deployment.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
