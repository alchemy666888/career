"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CareerIcon } from "./icons";
const navItems=[{label:"Home",href:"/dashboard",icon:"brief" as const},{label:"Discover",href:"/jobs",icon:"search" as const},{label:"Applications",href:"/applications",icon:"doc" as const},{label:"Interviews",href:"/interviews",icon:"mic" as const},{label:"Profile",href:"/profile",icon:"save" as const}];
export function CareerNav(){const pathname=usePathname(); return <header className="career-header cj-shell-header"><Link className="career-brand" href="/dashboard"><Image className="career-brand-logo" src="/careerai-logo.svg" alt="CareerAI" width={180} height={48} priority /></Link><nav className="career-nav" aria-label="Career workspace">{navItems.map(item=>{const active=pathname===item.href||pathname.startsWith(`${item.href}/`); return <Link key={item.href} aria-current={active?"page":undefined} className={active?"active":undefined} href={item.href}><CareerIcon name={item.icon}/><span>{item.label}</span></Link>})}</nav><Link className="cj-profile-pill" href="/profile">Alex</Link></header>}
