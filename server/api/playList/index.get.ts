import playlistModel from "../../models/Playlist";

export default defineEventHandler(async (event) => {
  let res = await playlistModel.find();
  return res;
});
