"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { careerJobs } from "./data";
import { CareerIcon } from "./icons";
import { JobCard } from "./JobCard";
import { useSavedJobs } from "./useSavedJobs";

function ChipInput({ title, placeholder, icon, values, onAdd, onRemove }: { title: string; placeholder: string; icon: "plus" | "brief"; values: string[]; onAdd: (value: string) => void; onRemove: (index: number) => void }) {
  const [value, setValue] = useState("");
  function submit() { const trimmed = value.trim(); if (trimmed) onAdd(trimmed); setValue(""); }
  return <div className="career-mini-panel"><h3>{title}</h3><div className="career-input-row"><label className="career-input-wrap"><CareerIcon name={icon} /><input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submit(); } }} placeholder={placeholder} /></label><button className="career-add-btn" type="button" onClick={submit} aria-label={`Add ${title.toLowerCase()}`}>+</button></div><div className="career-chip-zone">{values.map((item, index) => <span className="career-chip" key={item}>{item}<button type="button" aria-label={`Remove ${item}`} onClick={() => onRemove(index)}>×</button></span>)}</div></div>;
}

export function JobSearchPage() {
  const [skills, setSkills] = useState(["React", "UX Research", "SQL"]);
  const [roles, setRoles] = useState(["Product Designer", "Frontend Engineer"]);
  const [filter, setFilter] = useState("All");
  const [summary, setSummary] = useState("AI-ranked matches based on your skills and target positions.");
  const { saved, toggleSaved } = useSavedJobs();
  const filtered = useMemo(() => careerJobs.filter((job) => filter === "All" || job.type === filter || (filter === "High match" && job.score >= 88)), [filter]);
  const ranked = useMemo(() => [...careerJobs].sort((a, b) => b.score - a.score), []);
  return <>
    <section className="career-hero career-container"><h1>What role fits your skills?</h1><p className="career-lede">Add the skills you master and the positions you want. CareerAI will match relevant openings, explain the fit, and help draft your CV and cover letter.</p><div className="career-actions"><a className="career-btn secondary" href="#browse">Browse jobs</a><a className="career-btn secondary" href="#opportunities">Potential opportunities</a><Link className="career-btn secondary" href="/applications">Draft CV / Cover Letter</Link></div><div className="career-search-card"><div className="career-dual-grid"><ChipInput title="Skills you master" placeholder="e.g., React, SQL, UX research" icon="plus" values={skills} onAdd={(value) => setSkills((items) => items.some((item) => item.toLowerCase() === value.toLowerCase()) ? items : [...items, value])} onRemove={(index) => setSkills((items) => items.filter((_, i) => i !== index))} /><ChipInput title="Positions you want" placeholder="e.g., product designer, frontend engineer" icon="brief" values={roles} onAdd={(value) => setRoles((items) => items.some((item) => item.toLowerCase() === value.toLowerCase()) ? items : [...items, value])} onRemove={(index) => setRoles((items) => items.filter((_, i) => i !== index))} /></div><div className="career-generate"><button className="career-btn" type="button" onClick={() => setSummary(`AI-ranked for ${roles.join(" or ") || "your target roles"} using ${skills.join(", ") || "your profile"}.`)}><CareerIcon name="bolt" />Generate AI Matches</button></div></div></section>
    <section className="career-section career-container" id="browse"><div className="career-section-header"><div><h2>Browse open positions</h2><p>Explore curated roles across product, engineering, analytics, marketing, and customer success.</p></div><div className="career-filters">{["All", "Remote", "Hybrid", "High match"].map((item) => <button className={`career-filter ${filter === item ? "active" : ""}`} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="career-cards">{filtered.map((job) => <JobCard key={job.id} job={job} saved={saved.has(job.id)} onSave={toggleSaved} />)}</div></section>
    <section className="career-section career-container" id="opportunities"><div className="career-section-header"><div><h2>Potential opportunities</h2><p>{summary}</p></div><Link className="career-btn ghost" href="/applications">Open AI Draft Studio</Link></div><div className="career-stats"><div className="career-stat"><strong>{careerJobs.length}</strong><span>Matched roles</span></div><div className="career-stat"><strong>86%</strong><span>Average match score</span></div><div className="career-stat"><strong>3</strong><span>Strong CV fit</span></div><div className="career-stat"><strong>2</strong><span>Skill gaps to close</span></div></div><div className="career-notice">Tip: saved positions are stored locally in this browser until backend persistence is added.</div><div className="career-cards">{ranked.map((job) => <JobCard key={job.id} job={job} ranked saved={saved.has(job.id)} onSave={toggleSaved} />)}</div></section>
  </>;
}
