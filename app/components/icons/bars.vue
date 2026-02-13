<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 -960 960 960"
    width="40px"
    fill="currentColor"
    :class="['inline-block', sizeClass]"
  >
  <path xmlns="http://www.w3.org/2000/svg" d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/>
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
