export const useArtistsStore = defineStore('artists', {
  state: () => ({
    list: [] as Array<{ name: string; poster: string; count: number }>
  }),

 actions: {
   async fetchArtists() {
      this.list = await $fetch('/api/artists')
    },
    async fetchArtisSongs(artis: string) {
      return await $fetch(`/api/artists/${artis}`);
    }
  }
})
