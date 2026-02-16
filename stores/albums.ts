import { defineStore } from "pinia";
import type { Song } from "~~/shared/types/song";

export const useAlbumsStore = defineStore("albums", {
  state: () => ({
    list: [] as Array<{ name: string; poster: any; count: number }>,
    posterAlbum: "",   // پوستر آلبوم خاص
    nameAlbum: "",     // نام آلبوم خاص
    loading: false,
  }),

  actions: {
    async fetchAlbums() {
      this.loading = true;
      this.list = await $fetch("/api/albums");
      this.loading = false;
    },

    /**
     * گرفتن اطلاعات آلبوم خاص
     * @param albumSlug نام آلبوم
     * @param songs لیست آهنگ‌ها از songsStore
     */
    setAlbumInfo(albumSlug: string, songs: Song[]) {
      this.posterAlbum = songs.map((s) => s.poster?.medium).find(Boolean) || "";
      this.nameAlbum = songs[0]?.album || albumSlug;
    },
  },
});
