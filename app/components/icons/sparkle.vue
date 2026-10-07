<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :class="['inline-block', sizeClass, iconColor]"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M12 6.5V5.25m0 13.5V17.5m5.5-5.5h1.25m-13.5 0H4m12.799-3.299 1.06-1.06M5.94 15.94l-1.06 1.06m11.314 0 1.06 1.06M5.94 8.06 4.88 7m14.12 0-1.06 1.06M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    iconColor?: string;
  }>(),
  { size: "md", iconColor: "" },
);

const sizeClass = computed(
  () =>
    ({
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-7 h-7",
    })[props.size] ?? "w-5 h-5",
);
</script>
