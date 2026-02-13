import { defineStore } from "pinia";
import type { Song } from "../shared/types/song";

export const useIndexStore = defineStore("indexStore", {
  state: () => ({
    mySongs: reactive({
      list: [] as Song[],
      total: 3,
    }),
    playList: [],
    songSelected: ref<Song | null>(null),
  }),
  getters: {
    getMusicSelected(state) {
      return state.songSelected;
    },
  },
  actions: {
    async fetchGetSongs() {
      const data = await $fetch<Song[]>("/api/files");
      this.mySongs.list = data;
      this.mySongs.total = this.mySongs.list.length;
    },
  },
});
