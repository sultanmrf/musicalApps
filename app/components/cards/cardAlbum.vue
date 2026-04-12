<template>
  <NuxtLink :to="`/albums/${encodeURIComponent(album.name)}`">
    <div class="album-card group perspective-800 mt-6">
      <div class="album-inner">
        <NuxtImg
          src="/images/graph.webp"
          width="512"
          height="512"
          format="webp"
          quality="90"
          class="absolute top-[-2rem] w-full z-[-1] rounded-xl"
        />

        <NuxtImg
          :src="album.poster.medium"
          width="250"
          height="250"
          format="webp"
          quality="90"
          class="album-poster z-10 rounded-xl"
        />

        <figcaption
          class="absolute bottom-0 left-0 w-full p-3 backdrop-blur-sm bg-black/40 z-20 rounded-b-xl"
        >
          <h2
            class="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 truncate"
          >
            {{ album.name }}
          </h2>
          <div class="flex text-xs text-gray-200">
            <span class="truncate">{{ album.artist }}</span>
            <span class="mx-2">|</span>
            <span class="truncate">Songs {{ album.count }}</span>
          </div>
        </figcaption>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Album } from "~~/shared/types/album";
const { album } = defineProps<{ album: Album }>();
</script>

<style scoped>
.album-card {
  width: 170px;
  margin-bottom: 1rem;
  perspective: 800px; 
}

.album-inner {
  position: relative;
  border-radius: 1rem;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.album-card:hover .album-inner {
  transform: rotateX(5deg) rotateY(5deg) translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
}

.album-poster {
  width: 100%;
  display: block;
  border-radius: 1rem;
  transition: transform 0.5s ease;
}

.album-card:hover .album-poster {
  transform: scale(1.05);
}

.album-inner::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
</style>
