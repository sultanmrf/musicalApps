export const useAlbumsStore = defineStore("albums", {
  state: () => ({
    list: [],
    posterAlbum: "",
    loading: false,
  }),

  actions: {
    async fetchAlbums() {
      this.loading = true;
      this.list = await $fetch("/api/albums");
      this.loading = false;
    },

    async fetchAlbumSongs(album: string) {
      let res = await $fetch(`/api/albums/${album}`);
      this.posterAlbum =
        res.map((album) => album.poster?.medium).find(Boolean) || null;
      return res;
    },
  },
});
