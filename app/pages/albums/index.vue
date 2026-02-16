<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light">
      Albums {{ albumsStore.list.length }}
    </span>
  </div>

  <div v-if="albumsStore.list.length > 0" class="grid grid-cols-3 gap-5">
    <CardsCardAlbum 
    v-for="album in albumsStore.list" 
    :key="album.name"
   :album="album" />
  </div>
</template>

<script setup lang="ts">
import { useAlbumsStore } from "~~/stores/albums";

const albumsStore = useAlbumsStore();

await albumsStore.fetchAlbums();
</script>
