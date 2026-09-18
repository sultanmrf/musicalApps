export default defineEventHandler(async () => {
  try {
    const artists = groupBy<any>("songs", "artist", "name", 1);
    return artists;
  } catch (err) {
    console.error("Artists group error:", err);
    return [];
  }
});
