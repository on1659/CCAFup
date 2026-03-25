import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Shield } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const sections = [
  {
    title: "1. 수집하는 개인정보",
    content:
      "CCAFup은 서비스 제공을 위해 최소한의 정보만을 수집합니다. 이메일 구독 시 이메일 주소를 수집하며, 서비스 이용 시 브라우저 정보와 접속 로그가 자동으로 생성됩니다.",
  },
  {
    title: "2. 개인정보의 이용 목적",
    content:
      "수집된 정보는 뉴스레터 발송, 서비스 개선, 이용 통계 분석 목적으로만 사용됩니다.",
  },
  {
    title: "3. 개인정보의 보유 및 파기",
    content:
      "구독 해지 시 관련 정보는 지체 없이 파기됩니다. 법령에 의해 보존이 필요한 경우에는 해당 기간 동안 보관됩니다.",
  },
  {
    title: "4. 제3자 제공",
    content:
      "CCAFup은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.",
  },
  {
    title: "5. 쿠키 사용",
    content:
      "서비스 이용 편의를 위해 테마 설정, 언어 설정 등 기능적 쿠키를 사용합니다.",
  },
];

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("privacy.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("privacy.description")}
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h2 className="text-h3 text-heading mb-3">{section.title}</h2>
              <p className="text-body text-body leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-raised p-6">
          <p className="text-small text-sub text-center">
            최종 업데이트: 2026년 3월
          </p>
        </div>
      </div>
    </main>
  );
}
