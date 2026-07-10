import { JourneyProvider } from "@/components/career/journey/JourneyProvider";
import { CareerShell } from "@/components/career/shell/CareerShell";
export default function DashboardLayout({ children }: { children: React.ReactNode }) { return <JourneyProvider><CareerShell>{children}</CareerShell></JourneyProvider>; }
