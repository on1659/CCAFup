import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { HelpCircle, ChevronDown } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const faqItems = [
  {
    question: "CCA-F 시험은 누구를 위한 시험인가요?",
    answer:
      "Claude를 활용한 AI 아키텍처 설계에 관심 있는 개발자, 아키텍트, 기술 리더를 대상으로 합니다.",
  },
  {
    question: "시험은 어떤 형식인가요?",
    answer:
      "60문항 객관식 시험이며, 120분의 제한 시간이 주어집니다. 온라인 프록터링 방식으로 원격 응시합니다.",
  },
  {
    question: "합격 기준은 무엇인가요?",
    answer:
      "1000점 만점 기준 720점 이상을 받으면 합격입니다.",
  },
  {
    question: "재시험은 가능한가요?",
    answer:
      "불합격 시 일정 기간 후 재시험 응시가 가능합니다. 구체적인 재시험 정책은 공식 사이트를 확인하세요.",
  },
  {
    question: "어떤 내용을 공부해야 하나요?",
    answer:
      "5개 도메인(Agentic Architecture, Claude Code, Prompt Engineering, Tool Design & MCP, Context Management)을 중심으로 학습하세요.",
  },
];

export default function FaqPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("faq.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("faq.description")}
        </p>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-surface"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 text-h3 text-heading">
                <span>{item.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-sub transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border px-5 py-4">
                <p className="text-body text-body">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 더 많은 FAQ가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
