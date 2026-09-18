export default defineEventHandler(async (event) => {
  const album = decodeURIComponent(event.context.params!.album);
  const songs = findMany<any>("songs", { album });
  return songs.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
});
