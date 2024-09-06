<script setup lang="ts">
import { paginatorWindow } from "~/lib/paginator-window";
import IconChevronDoubleLeft from "./icons/mini/IconChevronDoubleLeft.vue";
import IconChevronLeft from "./icons/mini/IconChevronLeft.vue";
import IconChevronRight from "./icons/mini/IconChevronRight.vue";
import IconChevronDoubleRight from "./icons/mini/IconChevronDoubleRight.vue";

type Props = {
  page: number;
  maxPage: number;
  windowSize?: number;
};

const props = withDefaults(defineProps<Props>(), {
  windowSize: 5,
});

const emit = defineEmits({
  goto: (newPage: number) => {
    return typeof newPage === "number";
  },
});

const clickablePages = computed(() =>
  paginatorWindow({
    currentPage: props.page,
    maxPage: props.maxPage,
    windowSize: props.windowSize,
  }),
);

const selectFirstPage = () => {
  emit("goto", 1);
};

const selectLastPage = () => {
  emit("goto", props.maxPage);
};

const selectPrevPage = () => {
  emit("goto", props.page - 1);
};

const selectNextPage = () => {
  emit("goto", props.page + 1);
};

const selectPageByNumber = (newPage: number) => {
  emit("goto", newPage);
};
</script>

<template>
  <div class="mt-4 flex max-w-screen-sm flex-row gap-3">
    <div class="flex flex-row gap-1.5">
      <button
        class="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page === 1"
        @click="selectFirstPage"
      >
        <IconChevronDoubleLeft />
      </button>

      <button
        class="hidden h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:flex"
        :disabled="page === 1"
        @click="selectPrevPage"
      >
        <IconChevronLeft />
      </button>
    </div>

    <div class="flex flex-row gap-1.5">
      <button
        v-for="n in clickablePages"
        :key="'page:' + n"
        :data-active="page === n"
        class="h-9 w-9 rounded-md border text-sm hover:bg-neutral-100 data-[active=true]:border-black data-[active=true]:bg-black data-[active=true]:text-white"
        @click="() => selectPageByNumber(n)"
      >
        {{ n }}
      </button>
    </div>

    <div class="flex flex-row gap-1.5">
      <button
        class="hidden h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:flex"
        :disabled="page === maxPage"
        @click="selectNextPage"
      >
        <IconChevronRight />
      </button>

      <button
        class="flex h-9 w-9 items-center justify-center rounded-md border transition-all duration-200 hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page === maxPage"
        @click="selectLastPage"
      >
        <IconChevronDoubleRight />
      </button>
    </div>
  </div>
</template>
