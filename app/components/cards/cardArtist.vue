<template>
  <NuxtLink :to="`/artists/${encodeURIComponent(artist.name)}`"
    >
      <div class="shadow p-2 relative overflow-hidden mb-2">
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
                {{ artist.count }} Songs
              </span>
            </figcaption>
          </figure>

          <div class="btn-actions col-span-1 flex justify-end items-center">
            <IconsAngleRight
              size="sm"
              class="text-primary leading-[1.3rem] group-hover:font-black"
            />
          </div>
        </div>
      </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Artist } from "~~/shared/types/artist";

const { artist } = defineProps<{ artist: Artist }>()

</script>
