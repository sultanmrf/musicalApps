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
      stroke-width="2"
      d="m4.5 12.75 6 6 9-13.5"
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
