<script setup lang="ts">
import { cn } from "~/lib/cn";

type Props = {
  class?: string;
};

const props = defineProps<Props>();
const model = defineModel<string | number>({ required: false });
</script>

<!-- eslint-disable vue/html-self-closing -->
<!-- above is disabled because prettier formatter is annoying about this and will not let you have no / at the closing brace -->
<template>
  <input
    v-model="model"
    :class="
      cn(
        'h-9 flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
