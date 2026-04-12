<template>
  <span v-if="text" :class="textColor" class="mr-2">
    {{ text }}
  </span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="['inline-block', sizeClass, iconColor]"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    text?: string;
    textColor?: string;
    iconColor?: string;
  }>(),
  {
    size: "md",
    text: "",
    textColor: "text-white",
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
