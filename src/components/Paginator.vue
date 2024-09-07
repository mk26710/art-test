<script setup lang="ts">
import { paginatorWindow } from "~/lib/paginator-window";
import IconChevronDoubleLeft from "./icons/mini/IconChevronDoubleLeft.vue";
import IconChevronLeft from "./icons/mini/IconChevronLeft.vue";
import IconChevronRight from "./icons/mini/IconChevronRight.vue";
import IconChevronDoubleRight from "./icons/mini/IconChevronDoubleRight.vue";
import Button from "./ui/Button.vue";

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
      <Button size="icon" variant="outline" :disabled="page === 1" @click="selectFirstPage">
        <IconChevronDoubleLeft />
      </Button>

      <Button size="icon" variant="outline" :disabled="page === 1" @click="selectPrevPage">
        <IconChevronLeft />
      </Button>
    </div>

    <div class="flex flex-row gap-1.5">
      <Button
        v-for="n in clickablePages"
        :key="'page:' + n"
        :data-active="page === n"
        size="icon"
        :variant="page === n ? 'default' : 'outline'"
        class="transition-none"
        @click="() => selectPageByNumber(n)"
      >
        {{ n }}
      </Button>
    </div>

    <div class="flex flex-row gap-1.5">
      <Button size="icon" variant="outline" :disabled="page === maxPage" @click="selectNextPage">
        <IconChevronRight />
      </Button>

      <Button size="icon" variant="outline" :disabled="page === maxPage" @click="selectLastPage">
        <IconChevronDoubleRight />
      </Button>
    </div>
  </div>
</template>
