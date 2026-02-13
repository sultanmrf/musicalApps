<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light"> Artists 10 </span>
  </div>

  <div v-if="indexStore.mySongs.list.length > 0" class="grid grid-cols-1">
    <NuxtLink
      v-for="artist in artistsStore.list"
      :key="artist.name"
      :to="`/artists/${encodeURIComponent(artist.name)}`"
    >
      <card
        class="shadow p-2 relative overflow-hidden mb-2"
      >
        <div class="grid grid-cols-2 gap-3">
          <figure class="flex gap-3 col-span-1">
            <NuxtImg
              :src="artist.poster.thumb"
              class="rounded-full ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
              quality="80"
              width="70"
              height="70"
            />
            <figcaption class="flex flex-col justify-center items-baseline">
              <h2>{{ artist.name }}</h2>
              <span class="text-sm text-gray-400">
                {{ artist.count }} Songs</span
              >
            </figcaption>
          </figure>
          <div class="btn-actions col-span-1 flex justify-end items-center">
            <IconsAngleRight
              size="sm"
              class="text-primary leading-[1.3rem] group-hover:font-black"
            />
          </div>
        </div>
      </card>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "~~/stores/index";
import { useArtistsStore } from "~~/stores/artists";

const artistsStore = useArtistsStore();
const indexStore = useIndexStore();

await artistsStore.fetchArtists();

</script>
