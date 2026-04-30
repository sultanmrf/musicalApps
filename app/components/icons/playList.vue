<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="[sizeClass, iconColor]"
    class="inline-block align-middle relative -top-[1px]"
  >
    <path
      fill="currentColor"
      d="M14 10H3v2h11zm0-4H3v2h11zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2zM3 16h7v-2H3z"
    />
  </svg>

  <span v-if="text" :class="textClass" class="mr-2">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    text?: string;
    textClass?: string;
    iconColor?: string;
  }>(),
  {
    size: "md",
    text: "",
    textClass: "text-white",
    iconColor: "text-white",
  },
);

const sizeClass = computed(() => {
  return {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  }[props.size];
});
</script>

<style></style>
