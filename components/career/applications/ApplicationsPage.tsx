"use client";
import Link from "next/link";
import { useState } from "react";
import { useJourney } from "../journey/JourneyProvider";
import { getNextAction } from "../journey/selectors";
import { StatusBadge } from "../ui/Primitives";
export function ApplicationsPage(){const {state}=useJourney(); const [q,setQ]=useState(""); const apps=state.applications.filter(a=>{const r=state.roles.find(x=>x.id===a.roleId); return !q||`${r?.title} ${r?.company}`.toLowerCase().includes(q.toLowerCase())}); return <section className="career-container cj-page-head"><h1>Applications</h1><p>Pipeline first. Open a role workspace to tailor fixture documents and track local progress.</p><label>Search applications<input value={q} onChange={e=>setQ(e.target.value)}/></label>{apps.length===0&&<div className="cj-empty"><h2>No applications</h2><Link href="/jobs">Discover roles</Link> · <Link href="/saved">Shortlist</Link></div>}<div className="cj-list">{apps.map(a=>{const r=state.roles.find(x=>x.id===a.roleId)!; return <Link key={a.id} href={`/applications/${a.id}`}><StatusBadge status={a.status}/><strong>{r.title}</strong> · {r.company}<span>{a.lastActivity}</span><em>{getNextAction(a.status)}</em></Link>})}</div></section>}
