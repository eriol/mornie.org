import rss from '@astrojs/rss';
import { getPostUrl, getPosts } from '../lib/blog';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: "Daniele 'eriol' Tricoli Website",
    description: "Daniele 'eriol' Tricoli Website",
    site: context.site,
    stylesheet: false,
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getPostUrl(post.slug),
      categories: post.data.tags,
    })),
  });
}
