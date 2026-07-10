import { describe, expect, it } from "vitest";
import { createInitialJourneyState } from "../components/career/journey/fixtures";
import { calculateApplicationProgress, calculateInterviewReadiness, filterAndSortRoles, getHighestPriorityAction, getNextAction, getPipelineCounts } from "../components/career/journey/selectors";

describe("journey selectors",()=>{
 it("maps statuses to next actions",()=>{expect(getNextAction("discovered")).toBe("View role"); expect(getNextAction("shortlisted")).toBe("Start application"); expect(getNextAction("applying")).toBe("Continue application"); expect(getNextAction("submitted")).toBe("Add update / Prepare follow-up"); expect(getNextAction("interviewing")).toBe("Continue preparation"); expect(getNextAction("offer")).toBe("Review offer"); expect(getNextAction("accepted")).toBe("View outcome"); expect(getNextAction("closed")).toBe("Review learning / Archive")});
 it("groups pipeline counts",()=>{const c=getPipelineCounts(createInitialJourneyState()); expect(c.discovered).toBe(2); expect(c.shortlisted).toBe(1); expect(c.applying).toBe(1); expect(c.submitted).toBe(1); expect(c.interviewing).toBe(1)});
 it("filters and sorts discover roles",()=>{const s=createInitialJourneyState(); const out=filterAndSortRoles(s.roles,{query:"engineer",workStyle:"All",level:"All",match:"90",savedOnly:false,sort:"match"}); expect(out.map(r=>r.id)).toEqual(["orbit-frontend-engineer"])});
 it("calculates progress and readiness",()=>{const s=createInitialJourneyState(); expect(calculateApplicationProgress(s.applications[0])).toBeGreaterThan(40); expect(calculateInterviewReadiness(s.interviews[0])).toBeLessThan(80); expect(calculateInterviewReadiness(s.interviews[1])).toBe(100)});
 it("prioritizes urgent interview readiness",()=>{const s=createInitialJourneyState(); expect(getHighestPriorityAction(s)?.href).toBe("/interviews/int-northstar")});
});
