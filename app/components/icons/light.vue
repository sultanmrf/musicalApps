<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="currentColor"
    :class="['inline-block', sizeClass]"
  >
    <g xmlns="http://www.w3.org/2000/svg" fill="none">
      <g clip-path="url(#SVGHcSWxdhd)">
        <path
          fill="currentColor"
          fill-opacity=".16"
          d="M12 16a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
        />
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="1.5"
          d="M5 12H1m22 0h-4M7.05 7.05L4.222 4.222m15.556 15.556L16.95 16.95m-9.9 0l-2.828 2.828M19.778 4.222L16.95 7.05M12 19v4m0-22v4m4 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
        />
      </g>
      <defs>
        <clipPath id="SVGHcSWxdhd">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
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
