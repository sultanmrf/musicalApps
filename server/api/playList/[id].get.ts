import playlistModel from "../../models/Playlist";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "ID param is required",
      });
    }

    const playlist = await playlistModel.findById(id);

    if (!playlist) {
      throw createError({
        statusCode: 404,
        statusMessage: "Playlist not found",
      });
    }

    return playlist;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
    });
  }
});
