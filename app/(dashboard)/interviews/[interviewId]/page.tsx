import { InterviewWorkspacePage } from "@/components/career/interviews/InterviewWorkspacePage";
export default async function Page({params}:{params:Promise<{interviewId:string}>}){const {interviewId}=await params; return <InterviewWorkspacePage interviewId={interviewId}/>}
