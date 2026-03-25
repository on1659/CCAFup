import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { BookOpen, Clock, Target, ArrowRight } from "lucide-react";
import { SubscribeForm } from "@/components/subscribe-form";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-h1 text-heading mb-4 text-[32px] leading-tight sm:text-[40px]">
            {t("home.hero")}
          </h1>
          <p className="text-body text-sub mb-8 text-[17px]">
            {t("home.heroSub")}
          </p>

          {/* Metric cards */}
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface p-5">
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-h2 text-heading">{t("home.questions")}</p>
              <p className="text-small text-sub">Multiple Choice</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <Clock className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-h2 text-heading">{t("home.duration")}</p>
              <p className="text-small text-sub">Online Proctored</p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <Target className="mx-auto mb-2 h-6 w-6 text-accent" />
              <p className="text-h2 text-heading">{t("home.passingScore")}</p>
              <p className="text-small text-sub">Scaled Score</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${locale}/prep/roadmap`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-small font-medium text-white hover:bg-primary-hover transition-colors"
            >
              {t("home.startPrep")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/domains`}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-small font-medium text-heading hover:bg-raised transition-colors"
            >
              {t("home.viewDomains")}
            </Link>
          </div>
        </div>
      </section>

      {/* Email subscribe CTA */}
      <section className="border-t border-border bg-raised px-4 py-12 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-h2 text-heading mb-2">{t("common.subscribeCta")}</h2>
          <div className="mt-4">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
