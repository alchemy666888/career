import { ApplicationWorkspacePage } from "@/components/career/applications/ApplicationWorkspacePage";
export default async function Page({params}:{params:Promise<{applicationId:string}>}){const {applicationId}=await params; return <ApplicationWorkspacePage applicationId={applicationId}/>}
