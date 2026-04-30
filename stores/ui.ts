import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    selectedSong: null as null | {
      poster: string;
      artist: string;
      id: string;
    },
  }),

  actions: {
    setSelectedSong(data: { poster: string; artist: string; id: string }) {
      this.selectedSong = data;
    },
  },
});