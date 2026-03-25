import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BookA, Search } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const glossaryTerms = [
  {
    term: "Agentic Architecture",
    definition:
      "AI 에이전트가 자율적으로 도구를 사용하고, 판단하고, 반복적으로 작업을 수행하는 시스템 설계 패턴.",
  },
  {
    term: "MCP (Model Context Protocol)",
    definition:
      "Claude가 외부 도구 및 데이터 소스와 표준화된 방식으로 통신하기 위한 프로토콜.",
  },
  {
    term: "Orchestration",
    definition:
      "여러 에이전트 또는 모델 호출을 조율하여 복잡한 작업을 수행하는 과정.",
  },
  {
    term: "Guardrails",
    definition:
      "AI 출력의 안전성과 품질을 보장하기 위한 제약 조건 및 검증 메커니즘.",
  },
  {
    term: "Context Window",
    definition:
      "모델이 한 번에 처리할 수 있는 입력 텍스트의 최대 크기 (토큰 수).",
  },
  {
    term: "Structured Output",
    definition:
      "JSON, XML 등 정해진 스키마에 맞춰 생성되는 모델 출력 형식.",
  },
  {
    term: "Tool Use",
    definition:
      "Claude가 외부 함수나 API를 호출하여 작업을 수행하는 기능.",
  },
  {
    term: "System Prompt",
    definition:
      "모델의 동작 방식과 역할을 정의하는 초기 지시 프롬프트.",
  },
  {
    term: "Chain of Thought",
    definition:
      "모델이 단계별로 추론 과정을 보여주며 최종 답변에 도달하는 프롬프트 기법.",
  },
  {
    term: "Fallback",
    definition:
      "주요 처리 경로가 실패했을 때 대체 경로로 전환하는 오류 복구 패턴.",
  },
];

export default function GlossaryPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <BookA className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("glossary.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-8">
          {t("glossary.description")}
        </p>

        {/* Search placeholder */}
        <div className="mb-8 flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3">
          <Search className="h-4 w-4 text-hint" />
          <span className="text-small text-hint">
            {t("glossary.searchTerms")}
          </span>
        </div>

        <div className="space-y-3">
          {glossaryTerms.map((item) => (
            <div
              key={item.term}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h3 className="text-h3 text-heading mb-1 font-mono">
                {item.term}
              </h3>
              <p className="text-small text-sub">{item.definition}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 더 많은 용어가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
