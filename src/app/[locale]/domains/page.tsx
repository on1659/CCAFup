import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  Layers,
  Terminal,
  MessageSquare,
  Wrench,
  Brain,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "domains" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const domains = [
  {
    slug: "agentic-architecture",
    title: "Agentic Architecture & Orchestration",
    weight: 27,
    icon: Layers,
    description:
      "에이전트 아키텍처 설계, 오케스트레이션 패턴, 멀티 에이전트 시스템 구성",
  },
  {
    slug: "claude-code",
    title: "Claude Code Configuration & Workflows",
    weight: 20,
    icon: Terminal,
    description:
      "Claude Code 설정, 워크플로우 자동화, 개발 환경 통합",
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering & Structured Output",
    weight: 20,
    icon: MessageSquare,
    description:
      "효과적인 프롬프트 설계, 구조화된 출력 생성, 프롬프트 최적화 전략",
  },
  {
    slug: "tool-design-mcp",
    title: "Tool Design & MCP Integration",
    weight: 18,
    icon: Wrench,
    description:
      "도구 설계 원칙, MCP(Model Context Protocol) 통합, 외부 시스템 연동",
  },
  {
    slug: "context-management",
    title: "Context Management & Reliability",
    weight: 15,
    icon: Brain,
    description:
      "컨텍스트 윈도우 관리, 신뢰성 확보 전략, 에러 처리 및 폴백",
  },
];

export default function DomainsPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("domains.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("domains.description")}
        </p>

        <div className="space-y-4">
          {domains.map((domain) => (
            <Link
              key={domain.slug}
              href={`/${locale}/domains/${domain.slug}`}
              className="group flex items-start gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-hover hover:bg-raised"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                <domain.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-h3 text-heading">{domain.title}</h2>
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-caption font-medium text-primary-text">
                    {t("domains.weight")}: {domain.weight}%
                  </span>
                </div>
                <p className="text-small text-sub mt-1">{domain.description}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-hint transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
