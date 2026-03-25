import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  Headphones,
  Code2,
  Network,
  Zap,
  GitBranch,
  Database,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "scenarios" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const scenarios = [
  {
    slug: "customer-support-agent",
    title: "Customer Support Resolution Agent",
    icon: Headphones,
    description:
      "고객 문의를 자동으로 분류하고 해결하는 에이전트 시스템 구축",
    domains: ["Agentic Architecture", "Tool Design"],
  },
  {
    slug: "code-generation",
    title: "Code Generation with Claude Code",
    icon: Code2,
    description:
      "Claude Code를 활용한 코드 생성, 리뷰, 리팩토링 워크플로우",
    domains: ["Claude Code", "Prompt Engineering"],
  },
  {
    slug: "multi-agent-research",
    title: "Multi-Agent Research System",
    icon: Network,
    description:
      "여러 에이전트가 협업하여 리서치를 수행하는 멀티 에이전트 시스템",
    domains: ["Agentic Architecture", "Context Management"],
  },
  {
    slug: "developer-productivity",
    title: "Developer Productivity with Claude",
    icon: Zap,
    description:
      "개발자 생산성을 높이는 Claude 기반 도구 및 자동화 파이프라인",
    domains: ["Claude Code", "Tool Design"],
  },
  {
    slug: "claude-code-cicd",
    title: "Claude Code for CI/CD",
    icon: GitBranch,
    description:
      "CI/CD 파이프라인에 Claude Code를 통합하여 코드 품질 자동 관리",
    domains: ["Claude Code", "Context Management"],
  },
  {
    slug: "structured-data-extraction",
    title: "Structured Data Extraction",
    icon: Database,
    description:
      "비정형 데이터에서 구조화된 정보를 추출하는 파이프라인 설계",
    domains: ["Prompt Engineering", "Tool Design"],
  },
];

export default function ScenariosPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
            <Network className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("scenarios.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("scenarios.description")}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/${locale}/scenarios/${scenario.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-hover hover:bg-raised"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft">
                  <scenario.icon className="h-4 w-4 text-accent" />
                </div>
                <h2 className="text-h3 text-heading">{scenario.title}</h2>
              </div>
              <p className="text-small text-sub flex-1">{scenario.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {scenario.domains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full bg-primary-soft px-2 py-0.5 text-caption text-primary-text"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-hint transition-colors group-hover:text-accent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
