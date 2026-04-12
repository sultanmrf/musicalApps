export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const playlist = await Playlist.findById(id).populate("songs");

  return playlist;
});
