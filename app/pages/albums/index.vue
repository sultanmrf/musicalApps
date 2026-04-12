<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <span class="total-songs text-gray-600 dark:text-light">
      {{ albums.length }} Albums
    </span>
    <FiltersSortFilter type="albums"/>
  </div>

  <div v-if="albums.length > 0" class="grid grid-cols-3 gap-5">
    <CardsCardAlbum v-for="album in albums" :key="album._id" :album="album" />
  </div>
</template>

<script setup lang="ts">
const { albums, fetchAlbums } = useAlbums();

await fetchAlbums();
</script>
