import filesModel from "../../models/Files";
import path from "path";
import fs from "fs";
import { parseFile } from "music-metadata";
import Jimp from "jimp";
import { uploadFile } from "../utils/uploadFile";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  const uploadedFiles: string[] = [];

  if (!formData || !formData.length) {
    return { error: "هیچ فایلی ارسال نشده است." };
  }

  const coverDir = path.resolve("./public/images/music");
  if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });

  try {
    for (const file of formData) {

      const savedFile = await uploadFile(file, "music");
      const newName = savedFile.name;
      const filePath = path.resolve("./public" + savedFile.path);

      uploadedFiles.push(newName);

      let metadata;
      try {
        metadata = await parseFile(filePath);
      } catch (e) {
        metadata = null;
      }

      let poster = { large: "", medium: "", thumb: "" };

      if (metadata?.common?.picture?.length) {
        const pathImage = "images"; 
        const pic = metadata.common.picture[0];
        const baseName = `cover-${Date.now()}-${newName.replace(".mp3", "")}`;

        const image = await Jimp.read(Buffer.from(pic.data));

        const largeName = `${baseName}-1200.jpg`;
        await image
          .clone()
          .cover(1200, 1200)
          .quality(90)
          .writeAsync(path.join(coverDir, largeName));

        const mediumName = `${baseName}-600.jpg`;
        await image
          .clone()
          .cover(600, 600)
          .quality(85)
          .writeAsync(path.join(coverDir, mediumName));

        const thumbName = `${baseName}-300.jpg`;
        await image
          .clone()
          .cover(300, 300)
          .quality(80)
          .writeAsync(path.join(coverDir, thumbName));

        poster = {
          large: `${pathImage}/music/${largeName}`,
          medium: `${pathImage}/music/${mediumName}`,
          thumb: `${pathImage}/music/${thumbName}`,
        };
      }

      const dataFileForDatabase = {
        name: metadata?.common?.title || newName.replace(".mp3", ""),
        artist: metadata?.common?.artist || "unknown",
        album: metadata?.common?.album || "unknown",
        duration: metadata?.format?.duration || 0,
        path: savedFile.path,
        size: savedFile.size,
        type: savedFile.type,
        poster,
        status: "waiting",
        context: "",
        loves: [],
      };

      console.log(dataFileForDatabase);

      await filesModel.create(dataFileForDatabase);
    }

    return {
      message: "فایل‌ها با موفقیت آپلود شدند.",
      files: uploadedFiles,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "خطا در آپلود فایل",
    });
  }
});
