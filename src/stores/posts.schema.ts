import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const NewPostSchema = z.object({
  userId: PostSchema.shape.userId,
  title: PostSchema.shape.title,
  body: PostSchema.shape.body,
});

export type NewPost = z.infer<typeof NewPostSchema>;
