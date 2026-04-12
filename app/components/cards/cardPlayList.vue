<template>
  <NuxtLink :to="`/playList/${encodeURIComponent(playList.name)}`">
    <UCard
      :ui="{
        body: 'p-0 sm:p-0',
      }"
      class="group w-[180px] p-0 overflow-hidden border border-white/5 hover:bg-primary-500 transition dark:shadow-3d shadow-3d-dark"
    >
      <div class="relative">
        <NuxtImg
          :src="playList.cover ? playList.cover : 'images/playList.png'"
          width="300"
          height="300"
          format="webp"
          quality="90"
          class="w-full h-[180px] object-cover rounded-b-[65px] shadow-dark-50 group-hover:rounded-none transition-all duration-700"
        />

        <UButton
          icon="i-heroicons-play-solid"
          size="lg"
          class="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition rounded-full shadow-lg"
        />
      </div>

      <div class="p-3">
        <h3 class="text-md text-center font-semibold text-white truncate">
          {{ playList.name }}
        </h3>

        <div class="text-sm text-gray-400 mt-1 text-center">
          <span> {{ playList.description }} </span>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PlayList } from "~~/shared/types/playList";
const { playList } = defineProps<{ playList: PlayList }>();
</script>
