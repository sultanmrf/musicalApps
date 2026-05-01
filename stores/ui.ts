import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    selectedSongId: null,
  }),
  actions: {
    setSong(id) {
      this.selectedSongId = id;
    },
  },
});