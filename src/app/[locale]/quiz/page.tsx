import fs from "fs/promises";
import path from "path";
import { getTranslations } from "next-intl/server";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });
  return { title: t("title"), description: t("description") };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  const filePath = path.join(
    process.cwd(),
    "content",
    locale,
    "quiz",
    "questions.json"
  );
  const raw = await fs.readFile(filePath, "utf-8");
  const questions = JSON.parse(raw);

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-h1 text-heading mb-2">{t("title")}</h1>
          <p className="text-body text-sub">{t("description")}</p>
        </div>
        <QuizPlayer questions={questions} locale={locale} />
      </div>
    </main>
  );
}
