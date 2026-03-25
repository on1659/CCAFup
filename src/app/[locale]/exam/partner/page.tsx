import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Handshake, Globe, UserCheck, Building2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partner" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PartnerPage() {
  const t = useTranslations();

  const steps = [
    {
      icon: Globe,
      title: "파트너 네트워크 확인",
      description: "Anthropic 공식 파트너 사이트에서 인증 시험 정보를 확인합니다.",
    },
    {
      icon: UserCheck,
      title: "계정 등록",
      description: "시험 플랫폼에 계정을 생성하고 본인 인증을 완료합니다.",
    },
    {
      icon: Building2,
      title: "시험 예약",
      description: "원하는 날짜와 시간을 선택하여 시험을 예약합니다.",
    },
  ];

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
            <Handshake className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("partner.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("partner.description")}
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-small font-medium text-accent-text">
                {index + 1}
              </div>
              <div>
                <p className="text-h3 text-heading">{step.title}</p>
                <p className="text-small text-sub mt-1">{step.description}</p>
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
