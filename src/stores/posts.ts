import { defineStore } from "pinia";
import { PostSchema, type Post } from "./posts.schema";
import { chunkArray } from "~/lib/chunk-array";
import { sleep } from "~/lib/sleep";

const POSTS_PER_PAGE: number = 10;
const SIMULATE_DELAY: boolean = true;
const DELAY: number = 300; // in milliseconds

export const usePostsStore = defineStore("posts-store", () => {
  const posts = ref<Post[][]>([]);

  const _page = ref<number>(1);
  const page = computed(() => _page.value);

  const pagePosts = computed(() => {
    return posts.value[_page.value - 1];
  });

  const prevPage = async () => {
    if (_page.value === 1) {
      throw Error("reached first page");
    }

    if (SIMULATE_DELAY === true) {
      await sleep(DELAY);
    }

    _page.value = _page.value - 1;
  };

  const nextPage = async () => {
    if (_page.value === posts.value.length) {
      throw Error("reached last page");
    }

    if (SIMULATE_DELAY === true) {
      await sleep(DELAY);
    }

    _page.value = _page.value + 1;
  };

  const selectPage = async (pageNum: number) => {
    if (typeof pageNum !== "number") {
      throw TypeError("pageNum must be an integer Number");
    }

    if (pageNum % 1 > 0) {
      throw TypeError("pageNum must be an integer Number");
    }

    if (pageNum < 1) {
      throw Error("page number must be at least 1");
    }

    if (pageNum > posts.value.length) {
      throw Error("page number cannot exceed maximum number of pages");
    }

    if (SIMULATE_DELAY === true) {
      await sleep(DELAY);
    }

    _page.value = pageNum;
  };

  const getPosts = async () => {
    const data = await $fetch("/api/posts", {
      method: "GET",
    });

    const result = PostSchema.array().parse(data);

    const paginatedPosts = chunkArray(result, POSTS_PER_PAGE);
    posts.value = paginatedPosts;

    return result;
  };

  return { posts, page, pagePosts, getPosts, nextPage, prevPage, selectPage };
});
