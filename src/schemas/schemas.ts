import { z } from "astro/zod";

/**
 * Blog Schema: Used for to validate frontmatter for Blog posts.
 *
 * @property {string} title - The title of the blog post.
 * @property {string} description - A brief description of the blog post.
 * @property {Date} pubDatetime - The date the blog post was published (ISO 8601).
 * @property {Date} modDatetime - The last date on which the post was modified (ISO 8601).
 * @property {string} author - The author of the blog post.
 * @property {boolean} featured - Indicates whether the post should be featured on the front page.
 * @property {boolean} draft - Indicates whether the blog post is a draft.
 * @property {string} tags - A list of relevant topics covered in the blog post.
 */
export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDatetime: z.iso.datetime(),
  modDatetime: z.iso.datetime().optional().nullable(),
  author: z.string().default("Joey Guillaume"),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  tags: z.array(z.string()),
});
