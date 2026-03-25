import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ClipboardList, BookOpen, Clock, Target, Award } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "examOverview" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ExamOverviewPage() {
  const t = useTranslations();

  const highlights = [
    { icon: BookOpen, label: t("home.questions"), sub: "Multiple Choice" },
    { icon: Clock, label: t("home.duration"), sub: "Online Proctored" },
    { icon: Target, label: t("home.passingScore"), sub: "Scaled Score" },
    { icon: Award, label: "CCA-F", sub: "Foundations Level" },
  ];

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("examOverview.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("examOverview.description")}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <item.icon className="mb-3 h-6 w-6 text-primary" />
              <p className="text-h2 text-heading">{item.label}</p>
              <p className="text-small text-sub">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            {t("common.comingSoon")} &mdash; 상세 콘텐츠가 곧 추가됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
