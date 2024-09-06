import { defineStore } from "pinia";
import { PostSchema, type Post } from "./posts.schema";
import { chunkArray } from "~/lib/chunk-array";
import { sleep } from "~/lib/sleep";
import { randomNumber } from "~/lib/random-number";

const POSTS_PER_PAGE: number = 10;
const SIMULATE_DELAY: boolean = true;
const MIN_DELAY: number = 300; // in milliseconds
const MAX_DELAY: number = 600;

const GET_DELAY = () => {
  return randomNumber(MIN_DELAY, MAX_DELAY);
};

export const usePostsStore = defineStore("posts-store", () => {
  const underlyingPosts = ref<Post[]>([]);
  const posts = computed(() => {
    return chunkArray(underlyingPosts.value, POSTS_PER_PAGE);
  });

  const underlyingPage = ref<number>(1);
  const page = computed(() => underlyingPage.value);

  const pagePosts = computed(() => {
    return posts.value[underlyingPage.value - 1];
  });

  const isFetching = ref<boolean>(false);

  const orderById = async (order: "asc" | "desc" = "asc") => {
    if (SIMULATE_DELAY === true) {
      isFetching.value = true;
      await sleep(GET_DELAY()).finally(() => {
        isFetching.value = false;
      });
    }

    underlyingPosts.value = underlyingPosts.value.toSorted((a, b) => {
      if (order === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  };

  const prevPage = async () => {
    if (underlyingPage.value === 1) {
      throw Error("reached first page");
    }

    if (SIMULATE_DELAY === true) {
      isFetching.value = true;
      await sleep(GET_DELAY()).finally(() => {
        isFetching.value = false;
      });
    }

    underlyingPage.value = underlyingPage.value - 1;
  };

  const nextPage = async () => {
    if (underlyingPage.value === posts.value.length) {
      throw Error("reached last page");
    }

    if (SIMULATE_DELAY === true) {
      isFetching.value = true;
      await sleep(GET_DELAY()).finally(() => {
        isFetching.value = false;
      });
    }

    underlyingPage.value = underlyingPage.value + 1;
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
      isFetching.value = true;
      await sleep(GET_DELAY()).finally(() => {
        isFetching.value = false;
      });
    }

    underlyingPage.value = pageNum;
  };

  const getPosts = async () => {
    isFetching.value = true;
    const data = await $fetch("/api/posts", {
      method: "GET",
    }).finally(() => {
      isFetching.value = false;
    });

    const result = PostSchema.array().parse(data);
    underlyingPosts.value = result;

    return result;
  };

  return {
    posts,
    page,
    pagePosts,
    isFetching,
    getPosts,
    orderById,
    nextPage,
    prevPage,
    selectPage,
  };
});
