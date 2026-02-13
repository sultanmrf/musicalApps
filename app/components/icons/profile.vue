<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 0 24 24"
    width="40"
    fill="currentColor"
    :class="['inline-block', sizeClass]"
  >
    <g
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <circle cx="12" cy="6" r="4" />
      <path
        stroke-linecap="round"
        d="M15 20.615c-.91.247-1.926.385-3 .385c-3.866 0-7-1.79-7-4s3.134-4 7-4s7 1.79 7 4c0 .345-.077.68-.22 1"
      />
    </g>
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
