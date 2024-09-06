<script setup lang="ts">
import IconLongArrowDown from "~/components/icons/micro/IconLongArrowDown.vue";
import IconLongArrowUp from "~/components/icons/micro/IconLongArrowUp.vue";
import TailSpin from "~/components/icons/TailSpin.vue";
import Main from "~/components/Main.vue";

const indicator = useLoadingIndicator();
const postsStore = usePostsStore();
const [pageQuery, setPageQuery] = usePageQuery();
const [orderQuery, setOrderQuery] = useOrderQuery();

await postsStore.getPosts();
await postsStore.orderById(orderQuery);
await postsStore.selectPage(pageQuery ?? 1);

const { page, pagePosts, posts, isFetching, ordering } = storeToRefs(postsStore);

const updatePage = async (newPage: number) => {
  postsStore.selectPage(newPage).then(() => {
    setPageQuery(newPage);
  });
};

const reorder = async () => {
  if (ordering.value === "asc") {
    postsStore.orderById("desc").then(() => {
      setOrderQuery("desc");
    });
  } else {
    postsStore.orderById("asc").then(() => {
      setOrderQuery("asc");
    });
  }
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
              <th
                class="flex h-14 w-[90px] items-center gap-2 px-4 text-left align-middle text-base"
              >
                <span>ID</span>
                <button class="rounded-md px-2 py-1 hover:bg-white/20" @click="reorder">
                  <IconLongArrowUp v-if="ordering === 'asc'" />
                  <IconLongArrowDown v-else />
                </button>
              </th>
              <th class="h-14 w-[90px] px-4 text-left align-middle text-base">User ID</th>
              <th class="h-14 w-[250px] px-4 text-left align-middle text-base">Title</th>
              <th class="h-14 px-4 text-left align-middle text-base">Body</th>
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

      <Paginator :page="page" :max-page="posts.length" @goto="updatePage" />
    </div>
  </Main>
</template>
