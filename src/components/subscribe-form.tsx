"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { subscribeEmail } from "@/actions/subscribe";

export function SubscribeForm() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    formData.set("locale", locale);
    startTransition(async () => {
      const result = await subscribeEmail(formData);
      if (result.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "오류가 발생했습니다.");
      }
    });
  }

  return (
    <div>
      <form ref={formRef} action={handleSubmit} className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={t("emailPlaceholder")}
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-small text-body placeholder:text-hint focus:border-primary focus:outline-none"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-2.5 text-small font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {isPending ? "..." : t("subscribe")}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-small text-accent">{t("subscribeSuccess")}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-small text-danger">{errorMsg}</p>
      )}
    </div>
  );
}
