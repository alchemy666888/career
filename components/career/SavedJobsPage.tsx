"use client";
import Link from "next/link";
import { useState } from "react";
import { useJourney } from "./journey/JourneyProvider";
import { JobCard } from "./JobCard";
import { RoleComparison } from "./shortlist/RoleComparison";
export function SavedJobsPage(){const {state}=useJourney(); const [sort,setSort]=useState("match"); const jobs=state.roles.filter(r=>r.status==="shortlisted"&&!r.dismissed).sort((a,b)=>sort==="match"?b.matchScore-a.matchScore:(a.closingDate??"").localeCompare(b.closingDate??"")); return <section className="career-container cj-page-head"><h1>Shortlist</h1><p>{jobs.length} shortlisted roles. This compatibility route uses canonical role status and browser-local demo data.</p><label>Sort shortlist<select value={sort} onChange={e=>setSort(e.target.value)}><option value="match">Match</option><option value="deadline">Deadline</option></select></label>{jobs.length===0?<div className="cj-empty"><h2>No shortlisted roles yet</h2><p>Save roles from Discover to compare them here.</p><Link className="career-btn" href="/jobs">Discover roles</Link></div>:<><div className="career-cards">{jobs.map(j=><JobCard key={j.id} job={j} compare/>)}</div><RoleComparison/></>}</section>}
