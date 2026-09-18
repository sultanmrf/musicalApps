export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const playlist = findById<any>("playlists", body.playlistId);

  if (!playlist) {
    throw createError({ statusCode: 404, statusMessage: "Playlist not found" });
  }

  if (!body.songId) {
    throw createError({ statusCode: 400, statusMessage: "songId is required" });
  }

  return populatePlaylistSongs(
    pullFromArray<any>("playlists", body.playlistId, "songs", body.songId)
  );
});