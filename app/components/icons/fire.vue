<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="['inline-block', sizeClass]"
  >
    <path
      fill="currentColor"
      d="M12 2.5c.4 3 1.9 4.6 3.9 5.9 1.7 1.1 3.6 2.1 3.6 4.6a7.5 7.5 0 1 1-15 0c0-1.8.8-3.2 2-4.4-.1 1.6.6 2.7 1.6 3 .2-2.6 1.1-5.2 3.9-9.1Z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: "sm" | "md" | "lg" }>();

const sizeClass = computed(
  () =>
    ({
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-7 h-7",
    })[props.size ?? "md"] ?? "w-5 h-5",
);
</script>
