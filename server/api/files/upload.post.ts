import filesModel from "../../models/Files";
import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import Jimp from "jimp";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const uploadedFiles: string[] = [];

  if (!formData || !formData.length) {
    return { error: "هیچ فایلی ارسال نشده است." };
  }

  const uploadDir = path.resolve("./public/music");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const coverDir = path.resolve("./public/covers");
  if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });

  try {
    for (const file of formData) {
      const newFileName = file.filename.replaceAll(" ", "-").toLowerCase();
      const filePath = path.join(uploadDir, newFileName);
      fs.writeFileSync(filePath, file.data);
      uploadedFiles.push(newFileName);

      let metadata;
      try {
        metadata = await parseFile(filePath);
      } catch (e) {
        metadata = null;
      }

      let poster = { large: "", medium: "", thumb: "" };

      if (metadata?.common?.picture?.length) {
        const pic = metadata.common.picture[0];
        const baseName = `cover-${Date.now()}-${newFileName.replace(".mp3", "")}`;

        // خواندن تصویر با Jimp جدید
        const image = await Jimp.read(Buffer.from(pic.data));

        // 🖼 large
        const largeName = `${baseName}-1200.jpg`;
        await image
          .clone()
          .cover(1200, 1200)
          .quality(90)
          .writeAsync(path.join(coverDir, largeName));

        // 🖼 medium
        const mediumName = `${baseName}-600.jpg`;
        await image
          .clone()
          .cover(600, 600)
          .quality(85)
          .writeAsync(path.join(coverDir, mediumName));

        // 🖼 thumb
        const thumbName = `${baseName}-300.jpg`;
        await image
          .clone()
          .cover(300, 300)
          .quality(80)
          .writeAsync(path.join(coverDir, thumbName));

        poster = {
          large: `covers/${largeName}`,
          medium: `covers/${mediumName}`,
          thumb: `covers/${thumbName}`,
        };
      }

      const dataFileForDatabase = {
        fileName: metadata?.common?.title || newFileName.replace(".mp3", ""),
        artist: metadata?.common?.artist || "unknown",
        album: metadata?.common?.album || "",
        duration: metadata?.format?.duration || 0,
        path: `/music/${newFileName}`,
        size: file.data.length,
        type: file.type,
        poster,
        status: "waiting",
        context: "",
        loves: [],
      };

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
