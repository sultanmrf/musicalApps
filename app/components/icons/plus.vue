<template>
 
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="[sizeClass, iconColor]"
    class="inline-block align-middle relative -top-[1px]"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.5"
      d="M15 12h-3m0 0H9m3 0V9m0 3v3m10-3c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
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
