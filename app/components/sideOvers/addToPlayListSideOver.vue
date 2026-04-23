<template>
  <div>
    <USlideover side="bottom" v-model:open="isVisible">
      <template #header> Add to Playlist </template>
      <template #body>
        <div class="flex flex-col gap-2">
          <UButton variant="ghost" class="group text-white">
            ساخت پلی لیست جدید
          </UButton>

          <UButton
            v-for="playlist in playlists"
            :key="playlist._id"
            variant="ghost"
            class="group text-white"
          >
            {{ playlist.name }}
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { usePlaylist } from "~/composables/usePlayList";

const overlay = useOverlayManager();
const { getAllPlaylist, playlists } = usePlaylist();

await getAllPlaylist();

const isVisible = computed({
  get: () => overlay.isOpen("addToPlaylistSideOver"),
  set: (val) => (val ? overlay.open("addToPlaylistSideOver") : overlay.close()),
});
</script>
