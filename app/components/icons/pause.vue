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
      d="M2 18c0 1.886 0 2.828.586 3.414S4.114 22 6 22s2.828 0 3.414-.586S10 19.886 10 18V6c0-1.886 0-2.828-.586-3.414S7.886 2 6 2s-2.828 0-3.414.586S2 4.114 2 6v8m20-8c0-1.886 0-2.828-.586-3.414S19.886 2 18 2s-2.828 0-3.414.586S14 4.114 14 6v12c0 1.886 0 2.828.586 3.414S16.114 22 18 22s2.828 0 3.414-.586S22 19.886 22 18v-8"
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
