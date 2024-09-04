<script setup lang="ts">
import IconChevronLeft from "~/components/icons/mini/IconChevronLeft.vue";
import IconChevronRight from "~/components/icons/mini/IconChevronRight.vue";
import Main from "~/components/Main.vue";
import { paginatorWindow } from "~/lib/paginator-window";

const router = useRouter();
const indicator = useLoadingIndicator();
const pageQuery = usePageQuery();
const postsStore = usePostsStore();

await postsStore.getPosts();
await postsStore.selectPage(pageQuery ?? 1);

const clickablePages = computed(() =>
  paginatorWindow({
    currentPage: postsStore.page,
    maxPage: postsStore.posts.length,
  }),
);

const updatePage = async (newPage: number) => {
  indicator.start();

  postsStore
    .selectPage(newPage)
    .then(() => {
      void router.push({ query: { page: newPage } });
    })
    .finally(() => {
      indicator.finish();
    });
};

const prevPage = () => {
  if (pageQuery != null) {
    void updatePage(postsStore.page - 1);
  }
};

const nextPage = () => {
  if (pageQuery != null) {
    void updatePage(postsStore.page + 1);
  }
};
</script>

<template>
  <Main>
    <div class="container max-w-screen-lg flex flex-col items-center py-4">
      <div class="w-full overflow-auto relative">
        <table class="w-full caption-bottom text-sm">
          <thead>
            <tr class="transition-colors bg-neutral-800 font-bold text-white">
              <th class="h-12 px-4 text-left align-middle w-[90px]">ID</th>
              <th class="h-12 px-4 text-left align-middle w-[90px]">User ID</th>
              <th class="h-12 px-4 text-left align-middle w-[250px]">Title</th>
              <th class="h-12 px-4 align-middle text-left">Body</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in postsStore.pagePosts"
              :key="'post:' + post.id"
              class="transition-colors hover:bg-neutral-100 even:hover:bg-neutral-200 even:bg-neutral-100"
            >
              <td class="p-4 align-middle">{{ post.id }}</td>
              <td class="p-4 align-middle">{{ post.userId }}</td>
              <td class="p-4 align-middle">
                <span class="truncate line-clamp-2 text-wrap">{{ post.title }}</span>
              </td>
              <td class="p-4 align-middle">
                <span class="truncate line-clamp-2 text-wrap text-justify">{{ post.body }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="max-w-screen-sm flex flex-row gap-4 mt-4">
        <button
          class="rounded-md border h-10 w-10 flex items-center justify-center disabled:pointer-events-none hover:bg-neutral-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="postsStore.page === 1"
          @click="prevPage"
        >
          <IconChevronLeft />
        </button>

        <div class="flex flex-row gap-2">
          <button
            v-for="n in clickablePages"
            :key="'page:' + n"
            :data-active="postsStore.page === n"
            class="text-sm h-10 w-10 rounded-md border hover:bg-neutral-100 data-[active=true]:bg-black data-[active=true]:text-white data-[active=true]:border-black"
            @click="() => updatePage(n)"
          >
            {{ n }}
          </button>
        </div>

        <button
          class="rounded-md border h-10 w-10 flex items-center justify-center disabled:pointer-events-none hover:bg-neutral-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="postsStore.page === postsStore.posts.length"
          @click="nextPage"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  </Main>
</template>
