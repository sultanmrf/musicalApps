<template>
  <button
    type="button"
    class="group w-full text-right flex items-center gap-3 p-2.5 rounded-2xl border transition
      bg-white dark:bg-white/5 border-gray-100 dark:border-white/10
      hover:border-primary/40 hover:bg-primary/5"
  >
    <div class="relative shrink-0">
      <BrowserPosterArt
        :src="music.poster?.thumb"
        :alt="music.name"
        :seed="music._id"
        :width="120"
        :height="120"
        rounded="rounded-xl"
        class="w-14 h-14"
      />

      <span
        class="absolute inset-0 rounded-xl bg-black/45 backdrop-blur-[2px] grid place-items-center opacity-0 group-hover:opacity-100 transition"
      >
        <IconsPlay size="sm" class="text-white" />
      </span>
    </div>

    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold text-gray-800 dark:text-white truncate">
        {{ music.name }}
      </p>
      <p class="text-xs text-gray-400 truncate">{{ music.artist }}</p>
    </div>

    <IconsClock size="sm" class="text-gray-300 dark:text-gray-500 shrink-0" />
  </button>
</template>

<script setup lang="ts">
import type { Song } from "~~/shared/types/song";

const { music } = defineProps<{ music: Song }>();
</script>
