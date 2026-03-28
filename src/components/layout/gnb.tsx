"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, Search } from "lucide-react";
import { CommandMenu, useCommandMenu } from "@/components/search/command-menu";

const navGroups = [
  {
    label: "nav.examOverview",
    items: [
      { label: "nav.examOverview", href: "/exam/overview" },
      { label: "nav.examInfo", href: "/exam/info" },
      { label: "nav.partner", href: "/exam/partner" },
      { label: "nav.dayGuide", href: "/exam/day-guide" },
      { label: "nav.faq", href: "/exam/faq" },
    ],
  },
  {
    label: "nav.domains",
    items: [
      { label: "nav.domains", href: "/domains" },
      { label: "nav.scenarios", href: "/scenarios" },
      { label: "nav.glossary", href: "/glossary" },
    ],
  },
  {
    label: "nav.roadmap",
    items: [
      { label: "nav.roadmap", href: "/prep/roadmap" },
      { label: "nav.examPatterns", href: "/prep/exam-patterns" },
      { label: "nav.cheatsheet", href: "/prep/cheatsheet" },
      { label: "nav.quiz", href: "/quiz" },
      { label: "nav.resources", href: "/resources" },
    ],
  },
];

export function Gnb() {
  const t = useTranslations();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openSearch } = useCommandMenu();

  const pathname = usePathname();
  const otherLocale = locale === "ko" ? "en" : "ko";
  // Preserve current path when switching locale
  const localeSwitchHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header className="sticky top-0 z-header h-14 border-b border-border bg-page/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-primary text-[10px] font-bold text-white">
            C
          </div>
          <span className="text-h3 text-heading">CCAFup</span>
          <span className="rounded bg-primary-soft px-1.5 py-0.5 text-caption text-primary-text">
            {t("common.unofficial")}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button className="text-small text-sub hover:text-heading transition-colors">
                {t(group.label)}
              </button>
              <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                <div className="rounded-lg border border-border bg-surface p-2 shadow-lg min-w-[180px]">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      className="block rounded-md px-3 py-2 text-small text-body hover:bg-raised transition-colors"
                    >
                      {t(item.label)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => openSearch()}
            className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-small text-hint hover:border-border-hover transition-colors"
            aria-label={t("common.search")}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.search")}</span>
            <kbd className="hidden rounded border border-border px-1.5 text-caption text-hint sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Language toggle */}
          <Link
            href={localeSwitchHref}
            className="flex h-9 items-center rounded-lg border border-border px-2.5 text-small text-sub hover:text-heading transition-colors"
          >
            {locale === "ko" ? "EN" : "KR"}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sub hover:text-heading transition-colors"
            aria-label={theme === "dark" ? t("common.lightMode") : t("common.darkMode")}
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sub hover:text-heading lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-b border-border bg-surface p-4 lg:hidden">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="mb-1 text-caption text-hint uppercase tracking-wider">
                {t(group.label)}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-small text-body hover:bg-raised transition-colors"
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      <CommandMenu />
    </header>
  );
}
