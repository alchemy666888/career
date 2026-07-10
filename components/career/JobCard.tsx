"use client";
import Link from "next/link";
import type { CareerJob } from "./data";
import { CareerIcon } from "./icons";

function tagClass(index: number) { return ["", "purple", "blue", "gold"][index % 4]; }

export function JobCard({ job, ranked = false, saved = false, onSave }: { job: CareerJob; ranked?: boolean; saved?: boolean; onSave?: (id: number) => void }) {
  const score = `${job.score}%`;
  return <article className="career-job-card">
    <div className="career-job-top">
      {ranked ? <><div className="career-match-row"><div><h3 className="career-job-title">{job.title}</h3><div className="career-company">{job.company}</div></div><div className="career-score" style={{ "--score": score } as React.CSSProperties}>{job.score}%</div></div><div className="career-progress" style={{ "--score": score } as React.CSSProperties}><span /></div></> : <><h3 className="career-job-title">{job.title}</h3><div className="career-company">{job.company}</div></>}
      <p className="career-job-desc">{job.desc}</p>
      <div className="career-tag-row">{job.tags.map((tag, index) => <span className={`career-tag ${tagClass(index)}`} key={tag}>{tag}</span>)}</div>
    </div>
    <div className="career-job-meta"><div className="career-meta">Work style<strong>{job.type}</strong></div><div className="career-meta">Level<strong>{job.level}</strong></div><div className="career-meta">Salary<strong>{job.salary}</strong></div></div>
    <div className="career-job-actions"><Link className="career-btn dark" href="/applications">Tailor application</Link><button className={`career-icon-btn ${saved ? "saved" : ""}`} type="button" onClick={() => onSave?.(job.id)} aria-label={saved ? "Remove from saved" : "Save position"}><CareerIcon name="save" /></button></div>
  </article>;
}
