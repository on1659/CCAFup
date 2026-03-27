import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "cheatsheet" });
  return { title: t("title"), description: t("description") };
}

export default async function CheatsheetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cheatsheet" });
  const mdx = await getMdxSource(locale, "prep", "cheatsheet");

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
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-soft">
              <FileText className="h-5 w-5 text-warning" />
            </div>
            <h1 className="text-[24px] font-bold leading-tight text-heading">
              {t("title")}
            </h1>
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
