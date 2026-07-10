"use client";
import { useState } from "react";
import { CareerIcon } from "./icons";

function ChipInput({ title, placeholder, icon, values, onAdd, onRemove }: { title: string; placeholder: string; icon: "plus" | "brief"; values: string[]; onAdd: (value: string) => void; onRemove: (index: number) => void }) {
  const [value, setValue] = useState("");
  function submit() { const trimmed = value.trim(); if (trimmed) onAdd(trimmed); setValue(""); }
  return <div className="career-mini-panel"><h3>{title}</h3><div className="career-input-row"><label className="career-input-wrap"><CareerIcon name={icon} /><input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submit(); } }} placeholder={placeholder} /></label><button className="career-add-btn" type="button" onClick={submit} aria-label={`Add ${title.toLowerCase()}`}>+</button></div><div className="career-chip-zone">{values.map((item, index) => <span className="career-chip" key={item}>{item}<button type="button" aria-label={`Remove ${item}`} onClick={() => onRemove(index)}>×</button></span>)}</div></div>;
}

export function JobSearchPage() {
  const [skills, setSkills] = useState(["React", "UX Research", "SQL"]);
  const [roles, setRoles] = useState(["Product Designer", "Frontend Engineer"]);
  return <>
    <section className="career-hero career-container"><h1>What role fits your skills?</h1><p className="career-lede">Add the skills you master and the positions you want. CareerAI will match relevant openings, explain the fit, and help draft your CV and cover letter.</p><div className="career-search-card"><div className="career-dual-grid"><ChipInput title="Skills you master" placeholder="e.g., React, SQL, UX research" icon="plus" values={skills} onAdd={(value) => setSkills((items) => items.some((item) => item.toLowerCase() === value.toLowerCase()) ? items : [...items, value])} onRemove={(index) => setSkills((items) => items.filter((_, i) => i !== index))} /><ChipInput title="Positions you want" placeholder="e.g., product designer, frontend engineer" icon="brief" values={roles} onAdd={(value) => setRoles((items) => items.some((item) => item.toLowerCase() === value.toLowerCase()) ? items : [...items, value])} onRemove={(index) => setRoles((items) => items.filter((_, i) => i !== index))} /></div><div className="career-generate"><button className="career-btn" type="button"><CareerIcon name="bolt" />Generate AI Matches</button></div></div></section>
  </>;
}
