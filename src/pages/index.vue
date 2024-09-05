<script setup lang="ts">
import IconChevronLeft from "~/components/icons/mini/IconChevronLeft.vue";
import IconChevronRight from "~/components/icons/mini/IconChevronRight.vue";
import TailSpin from "~/components/icons/TailSpin.vue";
import Main from "~/components/Main.vue";
import { paginatorWindow } from "~/lib/paginator-window";

const router = useRouter();
const indicator = useLoadingIndicator();
const pageQuery = usePageQuery();
const postsStore = usePostsStore();

await postsStore.getPosts();
await postsStore.selectPage(pageQuery ?? 1);

const { page, pagePosts, posts, isFetching } = storeToRefs(postsStore);

const clickablePages = computed(() =>
  paginatorWindow({
    currentPage: page.value,
    maxPage: posts.value.length,
    windowSize: 5,
  }),
);

const updatePage = async (newPage: number) => {
  postsStore.selectPage(newPage).then(() => {
    void router.push({ query: { page: newPage } });
  });
};

const prevPage = () => {
  void updatePage(page.value - 1);
};

const nextPage = () => {
  void updatePage(page.value + 1);
};

watch(
  () => isFetching.value,
  (newValue) => {
    if (newValue === true) {
      indicator.start();
    } else {
      indicator.finish();
    }
  },
);
</script>

<template>
  <Main>
    <div class="container flex max-w-screen-lg flex-col items-center py-4">
      <div :data-fetching="isFetching" class="group relative grid w-full grid-cols-1 overflow-auto">
        <table class="w-full caption-bottom overflow-hidden text-sm">
          <thead>
            <tr class="border-x border-black bg-black font-bold text-white transition-colors">
              <th class="h-12 w-[90px] px-4 text-left align-middle">ID</th>
              <th class="h-12 w-[90px] px-4 text-left align-middle">User ID</th>
              <th class="h-12 w-[250px] px-4 text-left align-middle">Title</th>
              <th class="h-12 px-4 text-left align-middle">Body</th>
            </tr>
          </thead>
          <tbody
            class="group-data-[fetching=true]:opacity-45 group-data-[fetching=true]:blur-[2px]"
          >
            <tr
              v-for="post in pagePosts"
              :key="'post:' + post.id"
              class="border-x transition-colors even:bg-neutral-100 hover:bg-neutral-100 even:hover:bg-neutral-200"
            >
              <td class="p-4 align-middle">{{ post.id }}</td>
              <td class="p-4 align-middle">{{ post.userId }}</td>
              <td class="p-4 align-middle">
                <span class="line-clamp-2 truncate text-wrap">{{ post.title }}</span>
              </td>
              <td class="p-4 align-middle">
                <span class="line-clamp-2 truncate text-wrap text-justify">{{ post.body }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="isFetching"
          class="absolute flex h-20 w-20 items-center justify-center place-self-center"
        >
          <TailSpin class="h-16 w-16" />
        </div>
      </div>

      <div class="mt-4 flex max-w-screen-sm flex-row gap-4">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="page === 1"
          @click="prevPage"
        >
          <IconChevronLeft />
        </button>

        <div class="flex flex-row gap-2">
          <button
            v-for="n in clickablePages"
            :key="'page:' + n"
            :data-active="page === n"
            class="h-9 w-9 rounded-md border text-sm hover:bg-neutral-100 data-[active=true]:border-black data-[active=true]:bg-black data-[active=true]:text-white"
            @click="() => updatePage(n)"
          >
            {{ n }}
          </button>
        </div>

        <button
          class="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="page === posts.length"
          @click="nextPage"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  </Main>
</template>
