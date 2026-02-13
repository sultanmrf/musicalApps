<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light"> Albums 10 </span>
  </div>

  <div v-if="indexStore.mySongs.list.length > 0" class="grid grid-cols-3 gap-5">
    <NuxtLink
      v-for="album in albumsStore.list"
      :key="album.name"
      :to="`/albums/${encodeURIComponent(album.name)}`"
    >
      <card class="mb-3 rounded-2xl overflow-hidden ">
        <figure class="relative">
             <NuxtImg
            src="images/graph1.png"
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
      </card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "~~/stores/index";
import { useAlbumsStore } from "~~/stores/albums";

const albumsStore = useAlbumsStore();
const indexStore = useIndexStore();

await albumsStore.fetchAlbums();
</script>
