import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** CMS-ready: replace this directory with API/headless fetch while keeping the same types. */
const postsDirectory = path.join(process.cwd(), "content/blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  featured?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostSlugs(): string[] {
  return readSlugs();
}

export function getPostBySlug(slug: string): Post | null {
  const full = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    author: fm.author,
    featured: fm.featured,
    content,
  };
}

export function getAllPosts(): Post[] {
  return readSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(limit = 3): Post[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return all.slice(0, limit);
}
