<script setup lang="ts">
import IconArchive from "~/components/icons/solid/IconArchive.vue";
</script>

<template>
  <header
    class="h-header flex items-center box-border backdrop-blur-sm bg-white/80 sticky top-0 z-50"
  >
    <div class="container">
      <span class="flex flex-row items-center gap-2">
        <IconArchive class="w-5 h-5" />
        <span class="font-semibold">Posts Viewer</span>
      </span>
    </div>
  </header>
</template>
