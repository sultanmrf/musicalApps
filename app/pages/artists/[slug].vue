<template>
  <TabLinks />

  <div class="section-songs-artist w-full px-1 mt-2">
     <CardsCardMusic
      v-for="artist in artists"
      :key="artist._id"
      :music="artist"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSongsStore } from '~~/stores/songs'
import type { Song } from '~~/shared/types/song'

const route = useRoute()
const songsStore = useSongsStore()
const artists = ref<Song[]>([])

onMounted(async () => {
  await songsStore.fetchSongsByArtist(route.params.slug as string)
  artists.value = songsStore.list.filter(song => song.artist === route.params.slug)
})
</script>
