import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface Frontmatter {
  title: string;
  description: string;
  weight?: number;
  order?: number;
  locale?: string;
  lastUpdated?: string;
  readingTime?: number;
  relatedDomains?: string[];
  [key: string]: unknown;
}

export interface MdxFile {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export async function getMdxSource(
  locale: string,
  category: string,
  slug: string
): Promise<MdxFile | null> {
  const filePath = path.join(contentDir, locale, category, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as Frontmatter, content };
  } catch {
    return null;
  }
}

export async function getAllMdxSlugs(
  locale: string,
  category: string
): Promise<string[]> {
  const dir = path.join(contentDir, locale, category);
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getAllMdxFiles(
  locale: string,
  category: string
): Promise<MdxFile[]> {
  const slugs = await getAllMdxSlugs(locale, category);
  const files = await Promise.all(
    slugs.map((slug) => getMdxSource(locale, category, slug))
  );
  return files
    .filter((f): f is MdxFile => f !== null)
    .sort((a, b) => (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0));
}

/** Extract headings (h2, h3) from raw markdown for ToC */
export function extractHeadings(
  content: string
): { level: number; text: string; id: string }[] {
  const regex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}
