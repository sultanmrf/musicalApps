<template>
  <NuxtImg
    v-if="src"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    quality="80"
    :class="['object-cover', rounded]"
    loading="lazy"
  />

  <BrowserCoverArt
    v-else
    :seed="fallbackSeed"
    :label="alt"
    :variant="variant"
    :rounded="rounded"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string | null;
    alt?: string;
    width?: number;
    height?: number;
    rounded?: string;
    seed?: string;
    variant?: "rings" | "waves" | "bars" | "blob" | "grid" | "hill";
  }>(),
  {
    src: "",
    alt: "",
    width: 300,
    height: 300,
    rounded: "rounded-2xl",
    seed: "",
    variant: "rings",
  },
);

const fallbackSeed = computed(
  () => props.seed || props.src || props.alt || "musical",
);
</script>
