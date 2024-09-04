<script setup lang="ts">
import Header from "~/components/Header.vue";

useHead({
  title: "Posts Viewer",
  bodyAttrs: {
    class: "bg-white",
  },
  link: [
    { rel: "preconnect", href: "https://rsms.me/" },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ],
});
</script>

<template>
  <Header />
  <NuxtRouteAnnouncer />
  <NuxtPage />
  <NuxtLoadingIndicator />
</template>
