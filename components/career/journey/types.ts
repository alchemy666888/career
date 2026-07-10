export type JourneyStatus = "discovered" | "shortlisted" | "applying" | "submitted" | "interviewing" | "offer" | "accepted" | "closed";
export type CoverageLevel = "strong" | "partial" | "missing" | "blocker";
export type WorkStyle = "Remote" | "Hybrid" | "On-site";
export type JourneyRole = { id:string; legacyId:number; title:string; company:string; description:string; tags:string[]; workStyle:WorkStyle; location:string; level:string; salary:string; posted:string; freshness:string; source:string; matchScore:number; confidence:string; fitReasons:string[]; materialGap?:string; requirements:{label:string; coverage:CoverageLevel; evidence?:string}[]; responsibilities:string[]; effort:"Low"|"Medium"|"High"; status:JourneyStatus; closingDate?:string; lastActivity:string; notes:string; dismissed?:boolean; priority?:"High"|"Medium"|"Low" };
export type Artifact = { cv:string; cover:string };
export type Application = { id:string; roleId:string; status:JourneyStatus; lastActivity:string; artifacts:Artifact; preflight:Record<string, boolean>; timeline:JourneyEvent[]; notes:string; submittedAt?:string };
export type JourneyEvent = { id:string; at:string; label:string; detail:string };
export type Interview = { id:string; roleId:string; applicationId:string; stage:string; format:string; when:string; participants:string[]; completed:boolean; practiceAnswers:Record<string,string>; selectedStories:string[]; checklist:Record<string,boolean>; questionsToAsk:string[]; notes:string; postInterview?:{ asked:string; assessment:string; signals:string; thankYouDraft:string; followUpDate:string } };
export type Evidence = { id:string; title:string; summary:string; skills:string[]; provenance:"From resume"|"AI suggested"|"User added"; star:{situation:string; task:string; action:string; result:string} };
export type Profile = { name:string; headline:string; completeness:number; nextField:string; targetRoles:string[]; preferences:string[]; skills:string[]; history:string[]; evidence:Evidence[]; resumeSource:string };
export type DiscoverFilters = { query:string; workStyle:"All"|WorkStyle; level:"All"|string; match:"All"|"80"|"90"; savedOnly:boolean; sort:"match"|"freshness"|"deadline" };
export type Toast = { id:string; message:string; actionLabel?:string; action?:JourneyAction };
export type JourneyState = { roles:JourneyRole[]; applications:Application[]; interviews:Interview[]; profile:Profile; comparisonRoleIds:string[]; toasts:Toast[]; hydrated:boolean; storageWarning?:string };
export type JourneyAction =
 | {type:"hydrate"; state:JourneyState; warning?:string}
 | {type:"saveRole"|"unsaveRole"|"dismissRole"|"restoreRole"|"startApplication"; roleId:string}
 | {type:"updateArtifact"; applicationId:string; kind:keyof Artifact; html:string}
 | {type:"togglePreflight"; applicationId:string; key:string}
 | {type:"markSubmitted"|"undoSubmitted"; applicationId:string}
 | {type:"updateRoleNotes"; roleId:string; notes:string}
 | {type:"updateApplicationNotes"; applicationId:string; notes:string}
 | {type:"updateInterviewAnswer"; interviewId:string; question:string; answer:string}
 | {type:"toggleInterviewChecklist"; interviewId:string; key:string}
 | {type:"toggleStory"; interviewId:string; storyId:string}
 | {type:"addQuestionToAsk"; interviewId:string; question:string}
 | {type:"updateInterviewNotes"; interviewId:string; notes:string}
 | {type:"completeInterview"; interviewId:string; asked:string; assessment:string; signals:string}
 | {type:"updateProfile"; profile:Partial<Profile>}
 | {type:"toggleCompare"; roleId:string}
 | {type:"toast"; toast:Toast} | {type:"dismissToast"; id:string} | {type:"reset"};
