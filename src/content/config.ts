import { z, defineCollection } from "astro:content";

const PostData = z.object({
  title: z.string(),
  description: z.string(),
  authorID: z.string(),
  keywords: z.array(z.string()),
  tags: z.array(z.string()),
  lang: z.string(),
  draft: z.boolean(),
});

export const postsCollection = defineCollection({
  schema: PostData,
});

export const collections = {
  posts: postsCollection,
};

export type PostType = Required<typeof PostData._type>;
