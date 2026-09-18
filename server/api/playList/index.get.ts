export default defineEventHandler(async (event) => {
  const playlists = findAll<any>("playlists").map(populatePlaylistSongs);
  return playlists;
});