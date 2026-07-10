"use client";
import { useState } from "react";

const storageKey = "careerai-saved";

function readSavedJobs() {
  if (typeof window === "undefined") return new Set<number>();
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as number[];
    return new Set(parsed);
  } catch {
    return new Set<number>();
  }
}

export function useSavedJobs() {
  const [saved, setSaved] = useState<Set<number>>(readSavedJobs);

  function toggleSaved(id: number) {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      window.localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }

  return { saved, toggleSaved };
}
