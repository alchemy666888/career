import { describe, expect, it } from "vitest";
import { createInitialJourneyState } from "../components/career/journey/fixtures";
import { journeyReducer } from "../components/career/journey/journeyReducer";

describe("journey reducer",()=>{
 it("saves, starts, and submits a role",()=>{let s=createInitialJourneyState(); s=journeyReducer(s,{type:"saveRole",roleId:"loop-growth-marketing"}); expect(s.roles.find(r=>r.id==="loop-growth-marketing")?.status).toBe("shortlisted"); s=journeyReducer(s,{type:"startApplication",roleId:"loop-growth-marketing"}); const app=s.applications.find(a=>a.roleId==="loop-growth-marketing")!; expect(app).toBeTruthy(); s=journeyReducer(s,{type:"markSubmitted",applicationId:app.id}); expect(s.roles.find(r=>r.id==="loop-growth-marketing")?.status).toBe("submitted"); s=journeyReducer(s,{type:"undoSubmitted",applicationId:app.id}); expect(s.roles.find(r=>r.id==="loop-growth-marketing")?.status).toBe("applying")});
 it("caps comparison at three roles",()=>{let s=createInitialJourneyState(); for(const r of s.roles.slice(0,4)) s=journeyReducer(s,{type:"toggleCompare",roleId:r.id}); expect(s.comparisonRoleIds).toHaveLength(3)});
 it("updates interview preparation",()=>{let s=createInitialJourneyState(); s=journeyReducer(s,{type:"updateInterviewAnswer",interviewId:"int-northstar",question:"Q",answer:"A"}); expect(s.interviews[0].practiceAnswers.Q).toBe("A"); s=journeyReducer(s,{type:"completeInterview",interviewId:"int-northstar",asked:"Asked",assessment:"Good",signals:"Warm"}); expect(s.interviews[0].completed).toBe(true)});
});
