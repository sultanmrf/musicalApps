<template>
  <div class="flex items-center w-full my-2">
    <span class="total-songs text-gray-600 dark:text-light me-auto">
      PlayList
    </span>
    <ButtonsBtnDefault
      class="text-primary hover:text-primary"
      @click="storeSetting.showModal = true"
    >
      <IconsPlus size="md" iconColor="text-white" class="mx-5" />
    </ButtonsBtnDefault>

    <ULink to="/">
      <IconsAngleRight size="md" class="text-white hover:text-primary" />
    </ULink>
  </div>

  <div v-if="playlists.length > 0" class="grid grid-cols-3 gap-5 mt-5">
    <CardsCardPlayList
      v-for="playList in playlists"
      :key="playList._id"
      :playList="playList"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "~~/stores/setting";

const { playlists, getAllPlaylist } = usePlaylist();
const storeSetting = useSettingStore();

await getAllPlaylist();
</script>
