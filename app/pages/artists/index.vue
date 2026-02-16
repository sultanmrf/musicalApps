<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light">
      Artists {{ artistsStore.list.length }}
    </span>
  </div>

  <div v-if="artistsStore.list.length > 0" class="grid grid-cols-1">
    <CardsCardArtist 
       v-for="artist in artistsStore.list"
      :key="artist.name"
      :artist="artist"/>
  </div>
</template>

<script setup lang="ts">
import { useArtistsStore } from "~~/stores/artists";

const artistsStore = useArtistsStore();
await artistsStore.fetchArtists();
</script>
