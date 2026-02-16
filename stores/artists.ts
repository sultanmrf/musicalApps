import { defineStore } from "pinia";

export const useArtistsStore = defineStore("artists", {
  state: () => ({
    list: [] as Array<{ name: string; poster: any; count: number }>,
  }),

  actions: {
    async fetchArtists() {
      this.list = await $fetch("/api/artists");
      debugger;
    },

    getArtistInfo(artistSlug: string, songs: any[]) {
      const artistSongs = songs.filter((s) => s.artist === artistSlug);
      const poster = artistSongs.map((s) => s.poster?.medium).find(Boolean) || "";
      const count = artistSongs.length;
      return { poster, count };
    },
  },
});
