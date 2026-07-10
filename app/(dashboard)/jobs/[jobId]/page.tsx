import { RoleDetailPage } from "@/components/career/discover/RoleDetailPage";
export default async function Page({params}:{params:Promise<{jobId:string}>}){const {jobId}=await params; return <RoleDetailPage jobId={jobId}/>}
