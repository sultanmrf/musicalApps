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
import { usePlaylist } from "~/composables/usePlayList";

const props = defineProps<{
  songId: string;
}>();

const overlay = useOverlayManager();
const { getAllPlaylist, playlists, addSong } = usePlaylist();

await getAllPlaylist();

const isVisible = computed({
  get: () => overlay.isOpen("addToPlaylistSideOver"),
  set: (val) => (val ? overlay.open("addToPlaylistSideOver") : overlay.close()),
});

const setSongToPlayList = async (playList_id: string) => {
  let data: object = {
    playlistId: playList_id,
    songId: props.songId,
  };

  addSong(data);
};
</script>
