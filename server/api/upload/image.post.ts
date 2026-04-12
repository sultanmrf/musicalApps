import { uploadFile } from "../utils/uploadFile"

export default defineEventHandler(async (event) => {

  const form = await readMultipartFormData(event)

  if (!form?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "file not found"
    })
  }

  const file = form[0]

  const uploaded = await uploadFile(file, "images")

  return uploaded
})
