import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** File-backed press releases — swap for CMS fetch while keeping these types. */
const pressDirectory = path.join(process.cwd(), "content/press");

export type PressFrontmatter = {
  title: string;
  description: string;
  date: string;
  location: string;
  author: string;
};

export type PressRelease = PressFrontmatter & {
  slug: string;
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(pressDirectory)) return [];
  return fs
    .readdirSync(pressDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPressSlugs(): string[] {
  return readSlugs();
}

export function getPressBySlug(slug: string): PressRelease | null {
  const full = path.join(pressDirectory, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PressFrontmatter;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    location: fm.location,
    author: fm.author,
    content,
  };
}

export function getAllPressReleases(): PressRelease[] {
  return readSlugs()
    .map((slug) => getPressBySlug(slug))
    .filter((p): p is PressRelease => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
