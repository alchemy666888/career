"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CareerIcon } from "./icons";

const navItems = [
  { label: "Job Search", href: "/jobs", icon: "search" as const },
  { label: "AI Drafts", href: "/applications", icon: "doc" as const },
  { label: "Saved", href: "/saved", icon: "save" as const }
];

export function CareerNav() {
  const pathname = usePathname();
  return <header className="career-header">
    <Link className="career-brand" href="/jobs">
      <span className="career-logo"><CareerIcon name="brief" /></span>
      <span><span className="career-brand-title">CareerAI</span><span className="career-brand-subtitle">Find work that fits your strengths</span></span>
    </Link>
    <nav className="career-nav" aria-label="Career workspace">
      {navItems.map((item) => <Link key={item.href} className={pathname === item.href ? "active" : undefined} href={item.href}><CareerIcon name={item.icon} />{item.label}</Link>)}
    </nav>
  </header>;
}
