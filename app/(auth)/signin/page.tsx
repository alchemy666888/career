import Link from "next/link";
export default function SignInPage() {
  const emailAuthEnabled = process.env.EMAIL_AUTH_ENABLED === "true";
  return (
    <main className="container">
      <section className="card">
        <h1>Sign in</h1>
        <p>Choose an enabled authentication method to continue your private job search workspace.</p>
        <div className="landing-actions">
          <Link className="btn" href="/api/auth/signin/github">Continue with GitHub</Link>
          <Link className="btn" href="/api/auth/signin/google">Continue with Google</Link>
          {emailAuthEnabled ? <Link className="btn" href="/api/auth/signin/email">Continue with email</Link> : null}
        </div>
      </section>
    </main>
  );
}
