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

  <div v-if="storeIndex.mySongs.list.length > 0" class="grid grid-cols-2 gap-5">
    <FileUpload/>
    <card
      v-for="(music, id) in storeIndex.mySongs.list"
      class="shadow shadow-zinc-500 dark:shadow-zinc-700 mb-3 relative overflow-hidden"
    >
      <div class="grid gap-3">
        <figure class="flex gap-3 flex-col">
          <NuxtImg
            :src="music.poster"
            class="rounded-[1rem] ring-2 ring-gray-300 dark:ring-gray-500 shadow-3d dark:shadow-3d-dark"
            quality="80"
            width="100%"
            height="100"
          />
          <figcaption class="flex flex-col justify-center items-baseline">
            <h4>{{ music.fileName }}</h4>
          <span class="text-xs text-muted">تعداد آهنگ 2</span>
          </figcaption>
        </figure>
      </div>
    </card>
  </div>

</template>

<script setup lang="ts">
import { useIndexStore } from "../../stores/index";
import FileUpload from "~/components/fileUpload.vue";
let storeIndex = useIndexStore();
</script>
