"use client";

import { useState } from "react";
import Link from "next/link";
import { useJourney } from "../journey/JourneyProvider";
import { calculateApplicationProgress, getApplicationById, getRoleById } from "../journey/selectors";
import { ConfirmDialog, Progress, StatusBadge } from "../ui/Primitives";
import { DraftStudio } from "./DraftStudio";

export function ApplicationWorkspacePage({ applicationId }: { applicationId: string }) {
  const { state, dispatch } = useJourney();
  const [tab, setTab] = useState<"cv" | "cover" | "preflight">("cv");
  const [confirm, setConfirm] = useState(false);
  const app = getApplicationById(state, applicationId);
  const role = app && getRoleById(state, app.roleId);

  if (!app || !role) {
    return (
      <section className="career-container cj-empty">
        <h1>Application not found</h1>
        <Link href="/applications">Back to applications</Link>
      </section>
    );
  }

  const checks = Object.entries(app.preflight);

  return (
    <section className="career-container cj-page-head">
      <Link href="/applications">← Applications</Link>
      <h1>{role.title} application</h1>
      <p>{role.company} · {role.location}</p>
      <StatusBadge status={app.status} />
      <Progress value={calculateApplicationProgress(app)} label="Application progress" />
      <div className="cj-stepper" aria-label="Progress steps">
        {["Review requirements", "Tailor CV", "Tailor cover letter", "Complete pre-flight", "Confirm submitted"].map((step, index) => (
          <span key={step}>✓ {index + 1}. {step}</span>
        ))}
      </div>
      <div className="career-doc-switch application-doc-switch">
        <button type="button" aria-pressed={tab === "cv"} onClick={() => setTab("cv")}>CV</button>
        <button type="button" aria-pressed={tab === "cover"} onClick={() => setTab("cover")}>Cover letter</button>
        <button type="button" aria-pressed={tab === "preflight"} onClick={() => setTab("preflight")}>Pre-flight</button>
      </div>
      <div className="cj-workspace">
        <div>
          {tab !== "preflight" ? (
            <DraftStudio
              role={role}
              application={app}
              kind={tab}
              onChange={(html) => dispatch({ type: "updateArtifact", applicationId: app.id, kind: tab, html })}
            />
          ) : (
            <article className="cj-card application-preflight-card">
              <div className="application-preflight-header">
                <span>Final review</span>
                <h2>Pre-flight checklist</h2>
                <p>Finish each item before you leave CareerAI to submit externally.</p>
              </div>
              <div className="application-checklist">
                {checks.map(([key, value]) => (
                  <label className="cj-check application-check" key={key}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => dispatch({ type: "togglePreflight", applicationId: app.id, key })}
                    />
                    <span className="application-check-box" aria-hidden="true">✓</span>
                    <span className="application-check-label">{key}</span>
                  </label>
                ))}
              </div>
              <p className="application-preflight-note">
                External application link readiness is only a placeholder; CareerAI will not submit for you.
              </p>
              <button className="career-btn application-submit-btn" onClick={() => setConfirm(true)}>Mark as submitted</button>
            </article>
          )}
        </div>
        <aside className="cj-card">
          <h2>Requirements and evidence</h2>
          {role.requirements.map((requirement) => (
            <p key={requirement.label}>{requirement.coverage}: {requirement.label}</p>
          ))}
          <h2>Activity timeline</h2>
          <ol>
            {app.timeline.map((event) => (
              <li key={event.id}>{event.label}: {event.detail}</li>
            ))}
          </ol>
          <h2>Notes</h2>
          <textarea
            value={app.notes}
            onChange={(event) => dispatch({ type: "updateApplicationNotes", applicationId: app.id, notes: event.target.value })}
          />
        </aside>
      </div>
      <ConfirmDialog
        open={confirm}
        title="Mark as submitted?"
        description="Confirm only after you submitted through the employer or job board. CareerAI did not submit externally and will only update local tracking."
        confirmLabel="Mark submitted"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: "markSubmitted", applicationId: app.id });
          setConfirm(false);
        }}
      />
    </section>
  );
}
