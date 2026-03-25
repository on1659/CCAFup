import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Map, CheckCircle2, Circle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const roadmapSteps = [
  {
    phase: "Phase 1",
    title: "기초 다지기",
    duration: "1-2주",
    tasks: [
      "Claude API 공식 문서 정독",
      "Anthropic 공식 가이드 학습",
      "기본 프롬프트 엔지니어링 연습",
    ],
  },
  {
    phase: "Phase 2",
    title: "도메인별 심화 학습",
    duration: "2-3주",
    tasks: [
      "5개 도메인 핵심 개념 정리",
      "MCP 프로토콜 이해 및 실습",
      "에이전트 아키텍처 패턴 학습",
    ],
  },
  {
    phase: "Phase 3",
    title: "실전 시나리오 연습",
    duration: "1-2주",
    tasks: [
      "6개 시나리오 실습",
      "Claude Code 워크플로우 구성",
      "구조화된 출력 설계 연습",
    ],
  },
  {
    phase: "Phase 4",
    title: "최종 복습 및 모의시험",
    duration: "1주",
    tasks: [
      "치트시트로 핵심 정리",
      "모의시험 풀이 및 오답 분석",
      "취약 영역 보강",
    ],
  },
];

export default function RoadmapPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
            <Map className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("roadmap.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("roadmap.description")}
        </p>

        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <div
              key={step.phase}
              className="relative rounded-lg border border-border bg-surface p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-caption font-medium text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-caption text-primary font-medium">
                      {step.phase}
                    </p>
                    <h2 className="text-h3 text-heading">{step.title}</h2>
                  </div>
                </div>
                <span className="rounded-full bg-raised px-3 py-1 text-caption text-sub">
                  {step.duration}
                </span>
              </div>

              <ul className="space-y-2">
                {step.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-2.5">
                    <Circle className="h-4 w-4 shrink-0 text-hint" />
                    <span className="text-small text-body">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 상세 가이드가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
