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
      stroke-width="1.5"
      d="M3 12v6.967c0 2.31 2.534 3.769 4.597 2.648l3.203-1.742M3 8V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968a2.998 2.998 0 0 1 0 5.294l-6.406 3.484"
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
