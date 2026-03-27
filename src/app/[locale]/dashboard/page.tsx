import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { SubscribeForm } from "@/components/subscribe-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comingSoon" });
  return { title: t("dashboardTitle"), description: t("dashboardDesc") };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comingSoon" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="flex-1 px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
          <LayoutDashboard className="h-8 w-8 text-accent" />
        </div>
        <span className="mb-4 inline-block rounded-full bg-warning-soft px-3 py-1 text-caption font-medium text-warning-text">
          {t("badge")}
        </span>
        <h1 className="text-h1 text-heading mb-3">{t("dashboardTitle")}</h1>
        <p className="text-body text-sub mb-8">{t("dashboardDesc")}</p>

        <div className="rounded-xl border border-border bg-surface p-6">
          <p className="mb-4 text-small text-sub">{t("notify")}</p>
          <SubscribeForm />
        </div>

        <Link
          href={`/${locale}/domains`}
          className="mt-6 inline-flex items-center gap-1.5 text-small text-primary hover:text-primary-hover transition-colors"
        >
          {tc("readMore")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </main>
  );
}
