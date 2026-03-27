"use client";

import { useEffect, useState } from "react";

interface TocHeading {
  level: number;
  text: string;
  id: string;
}

interface TocProps {
  headings: TocHeading[];
  label?: string;
}

export function Toc({ headings, label = "목차" }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20">
      <p className="mb-3 text-caption font-medium uppercase text-hint">{label}</p>
      <ul className="space-y-2 border-l border-border pl-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-small transition-colors hover:text-primary ${
                h.level === 3 ? "pl-3 " : ""
              }${activeId === h.id ? "text-primary font-medium" : "text-sub"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
