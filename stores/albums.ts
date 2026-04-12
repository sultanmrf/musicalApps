import { defineStore } from "pinia";
import type { Song } from "~~/shared/types/song";

export const useAlbumsStore = defineStore("albums", {
  state: () => ({
    list: [] as Array<{ name: string; poster: any; count: number }>, 
    loading: false,
  }),

  actions: {
    async fetchAlbums() {
      this.loading = true;
      this.list = await $fetch("/api/albums");
      this.loading = false;
    }
  },
});
