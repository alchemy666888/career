"use client";
import { CareerNav } from "../CareerNav";
import { ToastRegion } from "../ui/Primitives";
export function CareerShell({children}:{children:React.ReactNode}){return <div className="cj-shell"><CareerNav/><main className="cj-main" id="main-content">{children}</main><ToastRegion/></div>}
