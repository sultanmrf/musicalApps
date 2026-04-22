const playlists = ref([]);
const currentPlaylist = ref<any>(null);
const { request } = useApi();

export const usePlaylist = () => {
  const createPlaylist = async (data: object) => {
    return await request("/api/playList/create", {
      method: "POST",
      body: data,
    });
  };

  const addSong = async (data: object) => {
    return await request("/api/playList/add", {
      method: "POST",
      body: data,
    });
  };

  const getPlaylist = async (id: string) => {
    const { data, error } = await request(`/api/playList/${id}`);

    if (data.value) {
      currentPlaylist.value = data.value;
    } else {
      console.error("Error:", error.value);
    }
  };

  const getAllPlaylist = async () => {
    const { data, error } = await request(`/api/playList`);
    if (data.value) {
      playlists.value = data.value;
    } else {
      console.error("Error:", error.value);
    }
  };

  const addPlaylist = (item: any) => {
    playlists.value.unshift(item);
  };

  return {
    playlists,
    currentPlaylist,
    createPlaylist,
    addSong,
    getPlaylist,
    getAllPlaylist,
    addPlaylist,
  };
};
