import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
