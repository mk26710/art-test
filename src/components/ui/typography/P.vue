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
  <h4 :class="cn('leading-7', props.class)">
    <slot />
  </h4>
</template>
