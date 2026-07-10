"use client";
import Link from "next/link";
import { careerJobs } from "./data";
import { CareerIcon } from "./icons";
import { JobCard } from "./JobCard";
import { useSavedJobs } from "./useSavedJobs";

export function SavedJobsPage() {
  const { saved, toggleSaved } = useSavedJobs();
  const jobs = careerJobs.filter((job) => saved.has(job.id));
  return <><section className="career-page-banner career-container"><div className="career-empty-icon"><CareerIcon name="save" /></div><h1 className="career-page-title with-icon">Saved positions</h1><p className="career-lede small">Keep promising roles in one place and return when you are ready to tailor an application.</p></section><section className="career-section career-container">{jobs.length === 0 ? <div className="career-empty"><div className="career-empty-icon"><CareerIcon name="save" /></div><h2>No saved positions yet</h2><p>Save jobs from Search to add them here. Saved jobs are currently browser-local until backend persistence is implemented.</p><div className="career-actions"><Link className="career-btn ghost" href="/jobs">Browse positions</Link></div></div> : <div className="career-cards">{jobs.map((job) => <JobCard key={job.id} job={job} ranked saved onSave={toggleSaved} />)}</div>}</section></>;
}
