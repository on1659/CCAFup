import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Network } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { getMdxSource, getAllMdxSlugs, extractHeadings } from "@/lib/mdx";
import { mdxComponents } from "@/components/content/mdx-components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const mdx = await getMdxSource(locale, "scenarios", slug);
  if (!mdx) {
    return { title: "Not Found" };
  }
  return {
    title: mdx.frontmatter.title,
    description: mdx.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const koSlugs = await getAllMdxSlugs("ko", "scenarios");
  const enSlugs = await getAllMdxSlugs("en", "scenarios");
  const params: { locale: string; slug: string }[] = [];
  for (const slug of koSlugs) params.push({ locale: "ko", slug });
  for (const slug of enSlugs) params.push({ locale: "en", slug });
  return params;
}

export default async function ScenarioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "scenarioDetail" });
  const mdx = await getMdxSource(locale, "scenarios", slug);

  if (!mdx) {
    notFound();
  }

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
            href={`/${locale}/scenarios`}
            className="mb-6 inline-flex items-center gap-1.5 text-small text-sub hover:text-heading transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToList")}
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft">
              <Network className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-[24px] font-bold leading-tight text-heading">
                {mdx.frontmatter.title}
              </h1>
            </div>
          </div>

          <article className="mdx-content">{content}</article>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <nav className="sticky top-20">
              <p className="mb-3 text-caption font-medium uppercase text-hint">
                목차
              </p>
              <ul className="space-y-2 border-l border-border pl-4">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`block text-small transition-colors hover:text-primary ${
                        h.level === 3 ? "pl-3 text-hint" : "text-sub"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </main>
  );
}
