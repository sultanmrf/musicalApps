<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <span class="total-songs text-gray-600 dark:text-light">
      {{ songsStore.total }} Songs
    </span>
   <FiltersSortFilter/>
  </div>

  <div v-if="songsStore.list.length > 0">
    <CardsCardMusic
      v-for="music in songsStore.list"
      :key="music._id"
      :music="music"
      :listSongs="songsStore.list"
    />
  </div>
</template>

<script setup lang="ts">
import { useSongsStore } from "~~/stores/songs";

const songsStore = useSongsStore();
await songsStore.fetchSongs();
</script>
