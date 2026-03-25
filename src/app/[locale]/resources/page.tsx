import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LinkIcon, ExternalLink, FileText, Users, Video } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const resourceCategories = [
  {
    icon: FileText,
    title: "공식 문서",
    items: [
      { name: "Anthropic API Documentation", url: "https://docs.anthropic.com" },
      { name: "Claude Model Card", url: "https://www.anthropic.com" },
      { name: "MCP Specification", url: "https://modelcontextprotocol.io" },
    ],
  },
  {
    icon: Video,
    title: "학습 자료",
    items: [
      { name: "Anthropic Courses", url: "https://www.anthropic.com" },
      { name: "Prompt Engineering Guide", url: "https://docs.anthropic.com" },
      { name: "Claude Code Documentation", url: "https://docs.anthropic.com" },
    ],
  },
  {
    icon: Users,
    title: "커뮤니티",
    items: [
      { name: "Anthropic Discord", url: "https://discord.gg/anthropic" },
      { name: "Claude Subreddit", url: "https://reddit.com/r/ClaudeAI" },
      { name: "GitHub Discussions", url: "https://github.com/anthropics" },
    ],
  },
];

export default function ResourcesPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <LinkIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("resources.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("resources.description")}
        </p>

        <div className="space-y-6">
          {resourceCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <category.icon className="h-5 w-5 text-primary" />
                <h2 className="text-h2 text-heading">{category.title}</h2>
              </div>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-md bg-raised px-4 py-3 text-small text-body transition-colors hover:bg-muted"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-hint" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 더 많은 리소스가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
