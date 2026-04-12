export const usePlaylist = () => {
  const playlists = ref([]);

  const createPlaylist = async (data: object) => {
    return await $fetch("/api/playlist/create", {
      method: "POST",
      body: data,
    });
  };

  const addSong = async (data: object) => {
    return await $fetch("/api/playlist/add", {
      method: "POST",
      body: data,
    });
  };

  const getPlaylist = async (id: number) => {
    return await $fetch(`/api/playlist/${id}`);
  };

  const getAllPlaylist = async () => {
    const res = await $fetch(`/api/playList`);
    playlists.value = res;
  };

  return {
    playlists,
    createPlaylist,
    addSong,
    getPlaylist,
    getAllPlaylist,
  };
};
