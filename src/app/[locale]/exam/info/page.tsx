import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Info, FileText, DollarSign, Monitor, ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "examInfo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ExamInfoPage() {
  const t = useTranslations();

  const infoItems = [
    {
      icon: FileText,
      title: "시험 형식",
      description: "60문항 객관식, 120분 제한",
    },
    {
      icon: DollarSign,
      title: "비용",
      description: "시험 등록 비용 및 재시험 정책",
    },
    {
      icon: Monitor,
      title: "시험 환경",
      description: "온라인 프록터링 기반 원격 응시",
    },
    {
      icon: ShieldCheck,
      title: "합격 기준",
      description: "720점 이상 (1000점 만점 스케일)",
    },
  ];

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("examInfo.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("examInfo.description")}
        </p>

        <div className="space-y-4">
          {infoItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-h3 text-heading">{item.title}</p>
                <p className="text-small text-sub mt-1">{item.description}</p>
              </div>
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
