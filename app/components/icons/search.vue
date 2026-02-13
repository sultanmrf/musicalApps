<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="currentColor"
    :class="['inline-block', sizeClass]"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      stroke-width="1.5"
      d="m21 21l-4-4m2-6a8 8 0 1 1-16 0a8 8 0 0 1 16 0"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  size?: "sm" | "md" | "lg";
}>();

const sizeClass = computed(() => {
  return {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  }[props.size ?? "md"];
});
</script>

<style></style>
