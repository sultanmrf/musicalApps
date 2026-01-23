import { defineStore } from 'pinia'
import type { Song } from '../shared/types/song'

export const useIndexStore = defineStore('indexStore', {
  state: () => ({
    mySongs: reactive({
      list: [] as Song[],
      total: 3
    }),
    playList: [],
    songSelected: ref<Song | null>(null)
  }),
  getters: {
    getMusicSelected(state) {
      return state.songSelected;
    }

  },
  actions: {
    async fetchGetSongs() {
      const { data, status, error } = await useFetch("/api/files");

      if (data.value.length > 0) {
        this.mySongs.list = data.value;        
        this.mySongs.total = this.mySongs.list.length;
      }
    }
  }
});
