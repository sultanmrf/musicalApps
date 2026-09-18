<template>
  <div>
    <USlideover side="bottom" v-model:open="isVisible">
      <template #header> Add to Playlist </template>
      <template #body>
        <div class="flex flex-col items-start">
          <UButton
            variant="ghost"
            class="group inline-flex items-center gap-2 text-white mb-3"
            @click="openCreateModal"
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

          <span
            v-if="!playlists.length"
            class="text-gray-400 text-sm py-4"
            >لیست پلی‌لیستی وجود ندارد. ابتدا یک پلی‌لیست بسازید.</span
          >
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from "~~/stores/ui";
import { useSettingStore } from "~~/stores/setting";
import { usePlaylist } from "~/composables/usePlayList";

const overlay = useOverlayManager();
const ui = useUiStore();
const storeSetting = useSettingStore();
const toast = useToast();

const { getAllPlaylist, playlists, addSong, getPlaylist, currentPlaylist } =
  usePlaylist();
await getAllPlaylist();

const isVisible = computed({
  get: () => overlay.isOpen("addToPlaylistSideOver"),
  set: (val) => (val ? overlay.open("addToPlaylistSideOver") : overlay.close()),
});

const openCreateModal = () => {
  overlay.close();
  storeSetting.showModal = true;
};

const setSongToPlayList = async (playList_id: string) => {
  if (!ui.selectedSongId) {
    toast.add({
      title: "آهنگ انتخاب نشده است",
      color: "error",
    });
    return;
  }

  const data = {
    playlistId: playList_id,
    songId: ui.selectedSongId,
  };

  const { data: res, error } = await addSong(data);

  if (error.value || !res.value) {
    toast.add({
      title: "خطا در افزودن آهنگ به پلی‌لیست",
      color: "error",
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  toast.add({
    title: "آهنگ با موفقیت اضافه شد",
    color: "success",
    icon: "i-heroicons-check-circle",
  });

  await getAllPlaylist();
  if (currentPlaylist.value?._id) {
    await getPlaylist(currentPlaylist.value._id);
  }

  overlay.close();
};
</script>