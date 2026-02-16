<template>
   <NuxtLink :to="`/albums/${encodeURIComponent(album.name)}`"
    >
      <div class="mb-3 rounded-2xl overflow-hidden">
        <figure class="relative">
          <NuxtImg
            src="/images/graph1.png"
            width="200"
            height="200"
            format="webp"
            quality="90"
            class="block w-full absolute top-[-9rem] z-10"
          />

          <NuxtImg
            :src="album.poster.thumb"
            width="200"
            height="200"
            format="webp"
            quality="90"
            class="block w-full hover:scale-110 transition-all duration-300 ease-out"
          />

          <figcaption
            class="absolute bottom-0 left-0 h-15 w-full bg-[linear-gradient(358deg,_rgba(0,0,0,0.9),_rgba(0,0,0,0.3))] p-2"
          >
            <h2 class="text-sm truncate">{{ album.name }}</h2>
            <div class="flex text-xs text-gray-300">
              <span class="truncate">{{ album.artist }}</span>
              <span class="mx-2">|</span>
              <span class="truncate">Songs {{ album.count }}</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Album } from "~~/shared/types/album";

const { album } = defineProps<{ album: Album }>();

</script>


