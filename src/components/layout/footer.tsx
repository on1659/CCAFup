import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-raised">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Disclaimer */}
        <p className="mb-6 text-caption text-hint text-center">
          {t("footer.disclaimer")}
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-small text-sub">
          <Link href={`/${locale}/privacy`} className="hover:text-heading transition-colors">
            {t("common.privacy")}
          </Link>
          <span className="text-hint">·</span>
          <Link href={`/${locale}/terms`} className="hover:text-heading transition-colors">
            {t("common.terms")}
          </Link>
          <span className="text-hint">·</span>
          <Link href={`/${locale}/resources`} className="hover:text-heading transition-colors">
            {t("nav.resources")}
          </Link>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-center text-caption text-hint">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
