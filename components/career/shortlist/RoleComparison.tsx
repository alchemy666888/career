"use client";
import { useJourney } from "../journey/JourneyProvider";
export function RoleComparison(){const {state}=useJourney(); const roles=state.roles.filter(r=>state.comparisonRoleIds.includes(r.id)); if(roles.length<2)return <p>Select two or three roles to compare.</p>; return <div className="cj-compare" role="region" aria-label="Role comparison">{roles.map(r=><article className="cj-card" key={r.id}><h3>{r.title}</h3><p>{r.matchScore}% match</p><p>Gap: {r.materialGap}</p><p>{r.salary}</p><p>{r.workStyle}; {r.freshness}</p><p>Effort: {r.effort}</p></article>)}</div>}
