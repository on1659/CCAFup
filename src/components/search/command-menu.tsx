"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Command } from "cmdk";
import { Search, FileText, BookOpen, Layers, GraduationCap } from "lucide-react";
import { search, type SearchItem } from "@/lib/search";

const categoryIcons: Record<string, typeof FileText> = {
  exam: FileText,
  domains: Layers,
  scenarios: BookOpen,
  prep: GraduationCap,
};

const categoryLabels: Record<string, string> = {
  exam: "시험",
  domains: "도메인",
  scenarios: "시나리오",
  prep: "준비",
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(`/${locale}${href}`);
    },
    [router, locale]
  );

  if (!open) return null;

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-modal">
      <div className="fixed inset-0 bg-page/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2">
        <Command className="rounded-xl border border-border bg-surface shadow-2xl" shouldFilter={false}>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="h-4 w-4 text-hint" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="콘텐츠 검색..."
              className="flex-1 bg-transparent py-3 text-body text-heading outline-none placeholder:text-hint"
            />
            <kbd className="rounded border border-border px-1.5 py-0.5 text-caption text-hint">ESC</kbd>
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            {query && results.length === 0 && (
              <Command.Empty className="py-6 text-center text-small text-hint">
                검색 결과가 없습니다
              </Command.Empty>
            )}
            {Object.entries(grouped).map(([category, items]) => {
              const Icon = categoryIcons[category] || FileText;
              return (
                <Command.Group key={category} heading={categoryLabels[category] || category}>
                  {items.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={item.href}
                      onSelect={() => handleSelect(item.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-small text-body transition-colors hover:bg-raised data-[selected=true]:bg-raised"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-hint" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-heading">{item.title}</p>
                        <p className="truncate text-caption text-hint">{item.description}</p>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

export function useCommandMenu() {
  return {
    open: () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    },
  };
}
