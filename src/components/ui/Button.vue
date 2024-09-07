<script setup lang="ts">
import { cn } from "~/lib/cn";

type Props = {
  class?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  size: "default",
  variant: "default",
});

const classes = computed(() =>
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    props.variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : null,
    props.variant === "destructive"
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : null,
    props.variant === "outline"
      ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : null,
    props.variant === "secondary"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : null,
    props.variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : null,
    props.variant === "link" ? "text-primary underline-offset-4 hover:underline" : null,
    props.size === "default" ? "h-10 px-4 py-2" : null,
    props.size === "sm" ? "h-9 rounded-md px-3" : null,
    props.size === "lg" ? "h-11 rounded-md px-8" : null,
    props.size === "icon" ? "h-10 w-10" : null,
    props.class,
  ),
);
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>
