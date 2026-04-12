import filesModel from "../../models/Files";

export default defineEventHandler(async (event) => {
  const album = decodeURIComponent(event.context.params!.album)

  return await filesModel.find({ album }).sort({ name: 1 })
})