import { ref, computed } from "vue";
import { useAlbumsStore } from "~~/stores/albums";
import { useSongsStore } from "~~/stores/songs";
import type { Song } from "~~/shared/types/song";

export function useAlbums() {
  const albumsStore = useAlbumsStore();
  const songsStore = useSongsStore();

  const loading = ref(false);
  const error = ref<string | null>(null);

  const albums = computed(() => albumsStore.list);

  const fetchAlbums = async () => {
    try {
      loading.value = true;
      await albumsStore.fetchAlbums();
    } catch (err: any) {
      error.value = err.message || "Failed to fetch albums";
    } finally {
      loading.value = false;
    }
  };

  const albumDetails = async (albumSlug: string) => {
    try {
      loading.value = true;
      await songsStore.fetchSongsByAlbum(albumSlug);

      const albumSongs = songsStore.list
        .filter((s) => s.album === albumSlug)
        .map((s) => reactive(s));

      const poster =
        albumSongs.map((s) => s.poster?.medium).find(Boolean) || "";

      const name = albumSongs[0]?.album || albumSlug;

      return { albumSongs, poster, name };
    } catch (err: any) {
      error.value = err.message || "Failed to fetch album details";
      return { albumSongs: [], poster: "", name: albumSlug };
    } finally {
      loading.value = false;
    }
  };

  return {
    albums,
    loading,
    error,
    fetchAlbums,
    albumDetails,
  };
}