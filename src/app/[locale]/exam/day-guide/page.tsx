import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  CalendarCheck,
  Wifi,
  Monitor,
  Camera,
  Clock,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dayGuide" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DayGuidePage() {
  const t = useTranslations();

  const checklist = [
    { icon: Monitor, label: "안정적인 컴퓨터와 최신 브라우저 준비" },
    { icon: Wifi, label: "안정적인 인터넷 연결 확인" },
    { icon: Camera, label: "웹캠 및 마이크 작동 확인" },
    { icon: Clock, label: "시험 시작 15분 전 입장" },
    { icon: CheckCircle2, label: "신분증 준비 (여권 또는 정부 발행 ID)" },
  ];

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-soft">
            <CalendarCheck className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("dayGuide.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("dayGuide.description")}
        </p>

        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="text-h2 text-heading mb-4">시험 당일 체크리스트</h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-md bg-raised p-3"
              >
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-body text-body">{item.label}</span>
              </div>
            ))}
          </div>
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
