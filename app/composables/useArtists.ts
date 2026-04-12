import { useArtistsStore } from "~~/stores/artists";
import { useSongsStore } from '~~/stores/songs'
import type { Song } from '~~/shared/types/song'

export function useArtists() {
  const artistsStore = useArtistsStore();
  const songsStore = useSongsStore()
  const loading = ref(false);
  const error = ref<string | null>(null);

  const artists = computed(() => artistsStore.list);

  const fetchArtists = async() => {
    try {
      loading.value = true;
      await artistsStore.fetchArtists();
    } catch (err: any) {
      error.value = err.message || "Failed to fetch albums";
    } finally {
      loading.value = false;
    }
  };


  const artistDetails = async(artistSlug: string) => {
   try {
      loading.value = true;
      await songsStore.fetchSongsByArtist(artistSlug);

      const artistSongs = songsStore.list
        .filter((s) => s.artist === artistSlug)
        .map((s) => reactive(s));

      const poster =
        artistSongs.map((s) => s.poster?.medium).find(Boolean) || "";

      const name = artistSongs[0]?.artist || artistSlug;

      return { artistSongs, poster, name };
          } catch (err: any) {
      error.value = err.message || "Failed to fetch artist details";
      return { artistSongs: [] };
    } finally {
      loading.value = false;
    }
  }

  return {
    artists,
    loading,
    error,
    fetchArtists,
    artistDetails,
  };
}
