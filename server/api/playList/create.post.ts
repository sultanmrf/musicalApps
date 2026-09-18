export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const playlist = create<any>("playlists", {
    name: body.name,
    description: body.description,
    userId: body.userId,
    cover: body.cover || "",
    songs: [],
    isPublic: true,
  });

  return playlist;
});