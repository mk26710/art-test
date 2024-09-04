import type { Config } from "tailwindcss";

const customHeights = {
  header: "var(--height-header)",
  main: "var(--height-main)",
};

export default {
  content: [
    "./src/**/*.{vue,ts,js}",
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "0.5rem",
      },
      height: { ...customHeights },
      minHeight: { ...customHeights },
      maxHeight: { ...customHeights },
    },
  },
  plugins: [],
} satisfies Config;
