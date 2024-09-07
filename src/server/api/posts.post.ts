import { randomNumber } from "~/lib/random-number";
import { NewPostSchema, PostSchema } from "~/stores/posts.schema";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => NewPostSchema.parse(body));

  const id = Math.floor(randomNumber(101, 10_000));
  const post = PostSchema.parse({ ...body, id });

  return post;
});
