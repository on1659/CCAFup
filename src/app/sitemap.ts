import type { MetadataRoute } from "next";
import { getAllMdxSlugs } from "@/lib/mdx";

const BASE_URL = "https://ccafup.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["ko", "en"];

  // Static pages
  const staticPages = [
    "",
    "/exam/overview",
    "/exam/info",
    "/exam/partner",
    "/exam/day-guide",
    "/exam/faq",
    "/domains",
    "/scenarios",
    "/glossary",
    "/prep/roadmap",
    "/prep/cheatsheet",
    "/resources",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  // Dynamic domain pages
  const domainEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const slugs = await getAllMdxSlugs(locale, "domains");
    for (const slug of slugs) {
      domainEntries.push({
        url: `${BASE_URL}/${locale}/domains/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  // Dynamic scenario pages
  const scenarioEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const slugs = await getAllMdxSlugs(locale, "scenarios");
    for (const slug of slugs) {
      scenarioEntries.push({
        url: `${BASE_URL}/${locale}/scenarios/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [...staticEntries, ...domainEntries, ...scenarioEntries];
}
