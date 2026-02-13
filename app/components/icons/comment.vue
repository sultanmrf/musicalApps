<template>
 <slot/>
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
      fill="currentColor"
      d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
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
