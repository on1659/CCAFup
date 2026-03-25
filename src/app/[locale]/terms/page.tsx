import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ScrollText } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const sections = [
  {
    title: "1. 서비스 개요",
    content:
      "CCAFup은 CCA-F(Claude Certified Architect - Foundations) 시험 준비를 위한 비공식 커뮤니티 정보 허브입니다. Anthropic과 공식적인 연관이 없으며, 제공되는 정보는 커뮤니티 기여를 기반으로 합니다.",
  },
  {
    title: "2. 면책 조항",
    content:
      "본 사이트의 콘텐츠는 정보 제공 목적이며, 시험 합격을 보장하지 않습니다. 공식 시험 정보는 Anthropic 공식 채널을 통해 확인하시기 바랍니다.",
  },
  {
    title: "3. 지적 재산권",
    content:
      "CCAFup의 고유 콘텐츠에 대한 저작권은 CCAFup에 있습니다. Claude, Anthropic 등의 상표는 각 소유자에게 귀속됩니다.",
  },
  {
    title: "4. 이용자의 의무",
    content:
      "이용자는 서비스를 합법적인 목적으로만 사용해야 하며, 시험 문제 유출 등 부정행위에 본 사이트를 이용해서는 안 됩니다.",
  },
  {
    title: "5. 서비스 변경 및 중단",
    content:
      "CCAFup은 사전 고지 없이 서비스 내용을 변경하거나 중단할 수 있습니다.",
  },
  {
    title: "6. 약관의 변경",
    content:
      "본 약관은 필요 시 변경될 수 있으며, 변경 시 사이트를 통해 공지합니다.",
  },
];

export default function TermsPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft">
            <ScrollText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-h1 text-heading">{t("terms.title")}</h1>
          </div>
        </div>

        <p className="text-body text-sub mb-10">
          {t("terms.description")}
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
