<template>
  <div>
    <USlideover side="bottom" v-model:open="isVisible">
      <template #header> Add to Playlist </template>
      <template #body>
        <div class="flex flex-col items-start">
          <UButton
            variant="ghost"
            class="group inline-flex items-center gap-2 text-white mb-3"
          >
            <IconsPlus
              text="Create Playlist New"
              size="md"
              textClass="text-lg mt-1"
            />
          </UButton>

          <UButton
            v-for="playlist in playlists"
            :key="playlist._id"
            variant="ghost"
            class="group w-auto text-white mb-2"
            @click="setSongToPlayList(playlist._id)"
          >
            <IconsPlayList
              :text="playlist.name"
              size="sm"
              textClass="text-md mt-1"
            />
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from "~~/stores/ui";
import { usePlaylist } from "~/composables/usePlayList";

const overlay = useOverlayManager();
const ui = useUiStore();
const toast = useToast();

const { getAllPlaylist, playlists, addSong } = usePlaylist();
await getAllPlaylist();

const isVisible = computed({
  get: () => overlay.isOpen("addToPlaylistSideOver"),
  set: (val) => (val ? overlay.open("addToPlaylistSideOver") : overlay.close()),
});

const setSongToPlayList = async (playList_id: string) => {
  const data = {
    playlistId: playList_id,
    songId: ui.selectedSongId,
  };

  await addSong(data);

  toast.add({
    title: "آهنگ با موفقیت اضافه شد",
    color: "primary", // اگر رنگِ green ارور داد، primary یا success بذار
  });

  overlay.close();
};
</script>
