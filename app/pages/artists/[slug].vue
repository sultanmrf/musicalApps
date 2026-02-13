<template>
  <TabLinks />

    <card
      v-for="artis in artists"
      :key="artis._id"
      class="shadow p-2 shadow-zinc-100 dark:shadow-neutral-600 mb-3 relative overflow-hidden cursor-pointer my-2"
    >
      <div class="grid grid-cols-3 gap-3">
        <figure class="flex gap-3 col-span-2">
          <NuxtImg
            :src="artis.poster.thumb"
            class="rounded-2xl ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
            quality="80"
            width="70"
            height="70"
          />
          <figcaption class="flex flex-col justify-center items-baseline">
            <h4>{{ artis.fileName }}</h4>
            <span>{{ artis.artist }}  </span>
          </figcaption>
        </figure>
      
      </div>
    </card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useArtistsStore } from "~~/stores/artists";
import type { Song } from "~~/shared/types/song";

const route = useRoute()
const artistsIndex = useArtistsStore()

const artists = ref<Song[]>([])

onMounted(async () => {
  artists.value = await artistsIndex.fetchArtisSongs(
    route.params.slug as string
  )
})
</script>
