"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

const sidebarGroups = [
  {
    labelKey: "sidebar.exam",
    items: [
      { labelKey: "nav.examOverview", href: "/exam/overview" },
      { labelKey: "nav.examInfo", href: "/exam/info" },
      { labelKey: "nav.partner", href: "/exam/partner" },
      { labelKey: "nav.dayGuide", href: "/exam/day-guide" },
      { labelKey: "nav.faq", href: "/exam/faq" },
    ],
  },
  {
    labelKey: "sidebar.learn",
    items: [
      { labelKey: "nav.domains", href: "/domains" },
      { labelKey: "nav.scenarios", href: "/scenarios" },
    ],
  },
  {
    labelKey: "sidebar.prep",
    items: [
      { labelKey: "nav.roadmap", href: "/prep/roadmap" },
      { labelKey: "nav.examPatterns", href: "/prep/exam-patterns" },
      { labelKey: "nav.cheatsheet", href: "/prep/cheatsheet" },
      { labelKey: "nav.quiz", href: "/quiz" },
      { labelKey: "nav.glossary", href: "/glossary" },
      { labelKey: "nav.resources", href: "/resources" },
    ],
  },
];

export function Sidebar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (href: string) => pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-surface">
      <nav className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        {sidebarGroups.map((group) => {
          const isOpen = !collapsed[group.labelKey];
          return (
            <div key={group.labelKey} className="mb-4">
              <button
                onClick={() => toggleGroup(group.labelKey)}
                className="mb-1 flex w-full items-center justify-between text-caption font-medium uppercase tracking-wider text-hint hover:text-sub transition-colors"
              >
                {t(group.labelKey)}
                {isOpen ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
              {isOpen && (
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={`/${locale}${item.href}`}
                        className={`block rounded-md px-3 py-1.5 text-small transition-colors ${
                          isActive(item.href)
                            ? "bg-primary-soft text-primary font-medium"
                            : "text-body hover:bg-raised hover:text-heading"
                        }`}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
