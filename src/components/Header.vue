<script setup lang="ts">
import IconArchive from "~/components/icons/solid/IconArchive.vue";
import IconPlus from "./icons/mini/IconPlus.vue";
import Modal from "./Modal.vue";
import Input from "./ui/Input.vue";
import Textarea from "./ui/Textarea.vue";
import Button from "./ui/Button.vue";
import Label from "./ui/Label.vue";
import P from "./ui/typography/P.vue";
import H3 from "./ui/typography/H3.vue";

const showNewPostModal = ref<boolean>(false);

const newPostFields = reactive({
  userId: "",
  title: "",
  body: "",
});

const newPostHandler = () => {
  console.log(newPostFields);
};
</script>

<template>
  <header
    class="sticky top-0 z-50 box-border flex h-[var(--height-header)] items-center bg-black text-white shadow"
  >
    <div class="container grid max-w-screen-lg grid-cols-2">
      <span class="flex flex-row items-center gap-2">
        <IconArchive class="h-5 w-5" />
        <span class="font-semibold">Posts Viewer</span>
      </span>

      <div class="flex justify-end">
        <Button variant="secondary" size="sm" @click="showNewPostModal = true">
          <IconPlus />
          <span>New Post</span>
        </Button>
      </div>
    </div>
  </header>

  <Modal v-model="showNewPostModal" class="w-full max-w-3xl">
    <form
      class="flex w-full flex-col gap-4 rounded-md border border-border bg-background p-4 shadow-lg"
      @submit.prevent="newPostHandler"
    >
      <div>
        <H3>New Post</H3>
        <P class="mt-0 text-muted-foreground">Fill out the form to create a new post</P>
      </div>

      <Label class="flex flex-col gap-1.5">
        <span>User ID<span class="text-red-500">*</span></span>
        <Input
          v-model="newPostFields.userId"
          name="userId"
          type="number"
          step="1"
          placeholder="123"
          required
        />
      </Label>

      <Label class="flex flex-col gap-1.5">
        <span>Title<span class="text-red-500">*</span></span>
        <Input
          v-model="newPostFields.title"
          name="title"
          type="text"
          placeholder="Cool Title"
          required
        />
      </Label>

      <Label class="flex flex-col gap-1.5">
        <span>Body<span class="text-red-500">*</span></span>
        <Textarea
          v-model="newPostFields.body"
          name="body"
          placeholder="I've had a lot of fun this summer..."
          required
        />
      </Label>

      <Button type="submit">Create Post</Button>
    </form>
  </Modal>
</template>
