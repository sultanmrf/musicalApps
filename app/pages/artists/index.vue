<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <span class="total-songs text-gray-600 dark:text-light">
      {{ artists.length }} Artists
    </span>

    <FiltersSortFilter type="artists"/>
  </div>

  <div v-if="artists.length" class="grid grid-cols-1">
    <CardsCardArtist
      v-for="artist in artists"
      :key="artist._id"
      :artist="artist"
    />
  </div>
</template>

<script setup lang="ts">
const { artists, fetchArtists } = useArtists();
const { sorting } = useFilter();
let sortingData = ref<String | null>(null);

await fetchArtists();
</script>
