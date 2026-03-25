import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FileText, Layers, Terminal, MessageSquare, Wrench, Brain } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cheatsheet" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const cheatsheetSections = [
  {
    icon: Layers,
    domain: "Agentic Architecture (27%)",
    points: [
      "Agent Loop: Observe → Think → Act → Repeat",
      "Orchestration: Sequential / Parallel / Routing",
      "Guardrails: Input validation + Output filtering",
    ],
  },
  {
    icon: Terminal,
    domain: "Claude Code (20%)",
    points: [
      "claude.yaml 설정 파일 구조",
      "Headless 모드: --print flag",
      "Session persistence & memory",
    ],
  },
  {
    icon: MessageSquare,
    domain: "Prompt Engineering (20%)",
    points: [
      "System → User → Assistant 역할 구분",
      "Structured output: JSON mode / XML tags",
      "Few-shot examples + Chain-of-thought",
    ],
  },
  {
    icon: Wrench,
    domain: "Tool Design & MCP (18%)",
    points: [
      "Tool schema: name, description, input_schema",
      "MCP: Server ↔ Client 통신 구조",
      "Error handling: graceful degradation",
    ],
  },
  {
    icon: Brain,
    domain: "Context Management (15%)",
    points: [
      "Context window: 200K tokens (Claude 3.5)",
      "Summarization for long conversations",
      "Reliability: retries, fallbacks, caching",
    ],
  },
];

export default function CheatsheetPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-soft">
            <FileText className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("cheatsheet.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("cheatsheet.description")}
        </p>

        <div className="space-y-4">
          {cheatsheetSections.map((section) => (
            <div
              key={section.domain}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <section.icon className="h-5 w-5 text-primary" />
                <h2 className="text-h3 text-heading">{section.domain}</h2>
              </div>
              <ul className="space-y-2">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 rounded-md bg-raised px-3 py-2"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-small text-body font-mono">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 더 상세한 치트시트가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
