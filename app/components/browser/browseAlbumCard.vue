<template>
  <NuxtLink
    :to="`/albums/${encodeURIComponent(album.name)}`"
    class="group block shrink-0 w-[9.5rem]"
  >
    <div class="relative">
      <BrowserPosterArt
        :src="album.poster?.medium"
        :alt="album.name"
        :seed="album.name"
        :width="300"
        :height="300"
        rounded="rounded-2xl"
        class="w-[9.5rem] h-[9.5rem] shadow-lg dark:shadow-black/40"
      />

      <span
        class="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-primary text-white grid place-items-center shadow-3xl-orage opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        <IconsPlay size="sm" class="text-white" />
      </span>
    </div>

    <p class="mt-2 text-sm font-semibold text-gray-800 dark:text-white truncate">
      {{ album.name }}
    </p>
    <p class="text-xs text-gray-400 truncate">{{ album.artist }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Album } from "~~/shared/types/album";

const { album } = defineProps<{ album: Album }>();
</script>
