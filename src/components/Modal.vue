<script setup lang="ts">
import { cn } from "~/lib/cn";

type Props = {
  class?: string;
};

const props = defineProps<Props>();
const showModal = defineModel<boolean>({ required: true });

const handleClose = () => {
  showModal.value = false;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal === true"
        class="bg-black/50 fixed left-0 top-0 z-[999] flex size-full flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        @click.self="handleClose"
      >
        <div :class="cn('transition-all', props.class)" @click.stop>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
