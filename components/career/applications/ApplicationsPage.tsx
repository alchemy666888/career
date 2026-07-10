"use client";

import Link from "next/link";
import { useState } from "react";
import { useJourney } from "../journey/JourneyProvider";
import { getNextAction } from "../journey/selectors";
import { StatusBadge } from "../ui/Primitives";

export function ApplicationsPage() {
  const { state } = useJourney();
  const [q, setQ] = useState("");
  const apps = state.applications.filter((application) => {
    const role = state.roles.find((item) => item.id === application.roleId);
    return !q || `${role?.title} ${role?.company}`.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <section className="career-container cj-page-head">
      <h1>Applications</h1>
      <p>Pipeline first. Open a role workspace to tailor fixture documents and track local progress.</p>
      <label>
        Search applications
        <input value={q} onChange={(event) => setQ(event.target.value)} />
      </label>
      {apps.length === 0 && (
        <div className="cj-empty">
          <h2>No applications</h2>
          <Link href="/jobs">Discover roles</Link> · <Link href="/saved">Shortlist</Link>
        </div>
      )}
      <div className="career-cards">
        {apps.map((application) => {
          const role = state.roles.find((item) => item.id === application.roleId)!;
          return (
            <article className="career-job-card cj-card application-card" key={application.id}>
              <div className="career-match-row">
                <div>
                  <h3 className="career-job-title">{role.title}</h3>
                  <div className="career-company">{role.company}</div>
                </div>
                <div className="career-score" aria-label={`Match ${role.matchScore} percent`}>
                  {role.matchScore}%
                </div>
              </div>
              <p>{role.location} · {role.workStyle} · {role.salary}</p>
              <StatusBadge status={application.status} />
              <p>
                <strong>Last activity:</strong> {application.lastActivity}
              </p>
              <p>{getNextAction(application.status)}</p>
              <div className="career-job-actions application-card-actions">
                <Link className="career-btn" href={`/applications/${application.id}`}>
                  Open application
                </Link>
                <Link className="career-tool" href={`/jobs/${role.id}`}>
                  View role
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
