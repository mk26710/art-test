<script setup lang="ts">
import IconArchive from "~/components/icons/solid/IconArchive.vue";
</script>

<template>
  <header
    class="sticky top-0 z-50 box-border flex h-header items-center bg-black shadow text-white"
  >
    <div class="container">
      <span class="flex flex-row items-center gap-2">
        <IconArchive class="h-5 w-5" />
        <span class="font-semibold">Posts Viewer</span>
      </span>
    </div>
  </header>
</template>
