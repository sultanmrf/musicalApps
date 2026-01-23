<template>
  <TabLinks />

  <div class="flex items-center justify-between w-full my-2">
    <buttons-btn-default class="flex w-auto h-10 text-primary">
      <font-awesome-icon icon="fal fa-arrow-down-arrow-up me-2" />
      Sorting
    </buttons-btn-default>
    <span class="total-songs text-gray-600 dark:text-light">
      Songs ({{ storeIndex.mySongs.total }})
    </span>
  </div>

  <div v-if="storeIndex.mySongs.list.length > 0">
    <FileUpload/>
    <card
      v-for="(music, id) in storeIndex.mySongs.list"
      class="shadow shadow-zinc-500 dark:shadow-zinc-700 mb-3 relative overflow-hidden"
    >
      <div class="grid grid-cols-3 gap-3">
        <figure class="flex gap-3 col-span-2">
          <NuxtImg
            :src="music.poster"
            class="rounded-full ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
            quality="80"
            width="70"
            height="70"
          />
          <figcaption class="flex flex-col justify-center items-baseline">
            <h4>{{ music.fileName }}</h4>
            <span> Hosin Ebliss </span>
          </figcaption>
        </figure>

        <div class="btn-actions col-span-1 flex justify-end items-center">


   
        </div>
      </div>
    </card>
  </div>

</template>

<script setup lang="ts">
import { useIndexStore } from "../../stores/index";
import FileUpload from "~/components/fileUpload.vue";


const storeIndex = useIndexStore();
</script>
