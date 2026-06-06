import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  return date.toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
}

export function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Remove date from slug.
export function getPostSlug(slug: string) {
  return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function getPostUrl(slug: string) {
  return `/blog/${getPostSlug(slug)}/`;
}

export function getTagUrl(tag: string) {
  return `/tags/${encodeURIComponent(tag)}/`;
}
