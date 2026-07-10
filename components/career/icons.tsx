export function CareerIcon({ name, className }: { name: "brief" | "search" | "doc" | "save" | "send" | "bolt" | "plus" | "mic"; className?: string }) {
  const paths = {
    brief: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    doc: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/>,
    save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>,
    plus: <path d="M12 2v20M2 12h20"/>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/></>
  };
  return <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{paths[name]}</svg>;
}
