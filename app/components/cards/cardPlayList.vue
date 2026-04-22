<template>
  <NuxtLink :to="`/playList/${playList._id}`">
    <UCard
      :ui="{
        body: 'p-0 sm:p-0',
      }"
      class="group w-[180px] p-0 overflow-hidden border border-white/5 h-60 hover:bg-primary-500 transition dark:shadow-3d shadow-3d-dark"
    >
      <div class="relative">
        <NuxtImg
          :src="playList.cover ? playList.cover : 'images/playList.png'"
          width="300"
          height="300"
          format="webp"
          quality="90"
          class="w-full h-[180px] object-cover p-2 shadow-dark-50 transition-all rounded-3xl duration-700"
        />

        <UButton
          size="md"
          color=""
          class="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition"
        >
          <iconsPlay size="md" />
        </UButton>
      </div>

      <div class="p-1 px-2">
        <h3
          class="text-md text-center font-semibold text-white text-end truncate"
        >
          {{ playList.name }}
        </h3>

        <span class="text-muted text-sm">Songs 4 </span>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PlayList } from "~~/shared/types/playList";
const { playList } = defineProps<{ playList: PlayList }>();
</script>
