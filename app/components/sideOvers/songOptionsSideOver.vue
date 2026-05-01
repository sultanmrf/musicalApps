<template>
  <div>
    <USlideover side="bottom" v-model:open="isVisible">
      <template #header>
        <div v-if="song" class="flex gap-2 items-center">
          <NuxtImg
            :src="song.poster.thumb"
            width="70"
            height="70"
            class="rounded-2xl"
          />
          <div class="flex text-white flex-col">
            <span>{{ song.artist }}</span>
          </div>
        </div>
      </template>

      <template #body>
        <div class="flex flex-col gap-2">
          <UButton
            variant="ghost"
            class="group text-white"
            @click="openAddToPlaylist"
          >
            <IconsPlayList />
            Add to playlist
          </UButton>

          <UButton variant="ghost" class="group text-white">
            <IconsTrash text="Delete" />
          </UButton>

          <UButton variant="ghost" class="group text-white">
            <IconsShare text="Share" />
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useSongsStore } from "~~/stores/songs";
import { useUiStore } from "~~/stores/ui";

const ui = useUiStore();
const songsStore = useSongsStore();
const overlay = useOverlayManager();

const song = computed(() =>
  songsStore.list.find((s) => s._id === ui.selectedSongId),
);

const isVisible = computed({
  get: () => overlay.isOpen("songOptionsSideOver"),
  set: (val) => (val ? overlay.open("songOptionsSideOver") : overlay.close()),
});

const openAddToPlaylist = () => {
  overlay.open("addToPlaylistSideOver");
};
</script>
