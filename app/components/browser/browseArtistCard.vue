<template>
  <NuxtLink
    :to="`/artists/${encodeURIComponent(artist.name)}`"
    class="group flex flex-col items-center gap-2 w-[5.5rem] shrink-0"
  >
    <div class="relative">
      <BrowserPosterArt
        :src="artist.poster?.thumb"
        :alt="artist.name"
        :seed="`artist-${artist.name}`"
        :width="200"
        :height="200"
        rounded="rounded-full"
        class="w-[4.5rem] h-[4.5rem] ring-2 ring-primary/30 group-hover:ring-primary transition"
      />

      <span
        class="absolute -bottom-0.5 -left-0.5 w-5 h-5 rounded-full bg-primary border-2 border-white dark:border-dark grid place-items-center shadow"
      >
        <IconsCheck size="sm" class="text-white !w-2.5 !h-2.5" />
      </span>
    </div>

    <p class="text-xs text-center text-gray-700 dark:text-gray-200 w-full truncate">
      {{ artist.name }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Artist } from "~~/shared/types/artist";

const { artist } = defineProps<{ artist: Artist }>();
</script>
