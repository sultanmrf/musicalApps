import { defineStore } from "pinia";
import type { Song } from "../shared/types/song";

export const useSongsStore = defineStore("songs", {
  state: () => ({
    list: [] as Song[],
    total: 0,
    songSelected: null as Song | null,
  }),

  getters: {
    getMusicSelected(state) {
      return state.songSelected;
    },
  },

  actions: {
    async fetchSongs() {
      const data = await $fetch<Song[]>("/api/files");
      this.list = data.map((s) => ({
        ...s,
        status: s.status || "waiting",
      }));
      this.total = this.list.length;
    },

    async fetchSongsByAlbum(album: string) {
      const data = await $fetch<Song[]>(`/api/albums/${album}`);
      data.forEach((song) => {
        const exists = this.list.find((s) => s._id === song._id);
        if (!exists) {
          this.list.push({ ...song, status: "waiting" });
        }
      });
    },

    async fetchSongsByArtist(artist: string) {
      const data = await $fetch<Song[]>(`/api/artists/${artist}`);
      data.forEach((song) => {
        const exists = this.list.find((s) => s._id === song._id);
        if (!exists) {
          this.list.push({ ...song, status: "waiting" });
        }
      });
    },

    changeStatus(id: string, status: string) {
      debugger;
      const song = this.list.find((s) => s._id === id);
      if (song) song.status = status;
    },
  },
});
