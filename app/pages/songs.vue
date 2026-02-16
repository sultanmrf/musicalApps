<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light">
      Songs {{ songsStore.total }}
    </span>
  </div>

  <div v-if="songsStore.list.length > 0">
    <CardsCardMusic
      v-for="music in songsStore.list"
      :key="music._id"
      :music="music"
    />
  </div>
</template>

<script setup lang="ts">
import { useSongsStore } from "~~/stores/songs";

const songsStore = useSongsStore();
await songsStore.fetchSongs();
</script>
