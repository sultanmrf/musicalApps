export default defineEventHandler(async (event) => {
  const artistName = decodeURIComponent(event.context.params.artist);
  const songs = findMany<any>("songs", { artist: artistName });
  return songs;
});
