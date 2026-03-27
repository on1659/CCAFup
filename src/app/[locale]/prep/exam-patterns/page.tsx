import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { getMdxSource, extractHeadings } from "@/lib/mdx";
import { mdxComponents } from "@/components/content/mdx-components";
import { Toc } from "@/components/layout/toc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "examPatterns" });
  return { title: t("title"), description: t("description") };
}

export default async function ExamPatternsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "examPatterns" });
  const mdx = await getMdxSource(locale, "prep", "exam-patterns");

  if (!mdx) notFound();

  const headings = extractHeadings(mdx.content);
  const { content } = await compileMDX({
    source: mdx.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <main className="flex-1 px-4 py-12">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${locale}/prep/roadmap`}
            className="mb-6 inline-flex items-center gap-1.5 text-small text-sub hover:text-heading transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToPrep")}
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger-soft">
              <Target className="h-5 w-5 text-danger" />
            </div>
            <div>
              <h1 className="text-[24px] font-bold leading-tight text-heading">
                {t("title")}
              </h1>
            </div>
          </div>

          <article className="mdx-content">{content}</article>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <Toc headings={headings} />
          </aside>
        )}
      </div>
    </main>
  );
}
