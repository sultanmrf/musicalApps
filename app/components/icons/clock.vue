<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="['inline-block', sizeClass]"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
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
