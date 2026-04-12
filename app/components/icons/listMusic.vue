<template>
  <span
    v-if="text"
    :class="textColor"
    class="mr-2"
  >
    {{ text }}
  </span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill="currentColor"
    :class="['inline-block', sizeClass, iconColor]"
  >
    <path
      d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"
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
  }
);

const sizeClass = computed(() => {
  return {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  }[props.size];
});
</script>
