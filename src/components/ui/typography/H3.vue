<script setup lang="ts">
import { cn } from "~/lib/cn";

const props = defineProps({
  class: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <h3 :class="cn('scroll-m-20 text-2xl font-semibold tracking-tight', props.class)">
    <slot />
  </h3>
</template>
