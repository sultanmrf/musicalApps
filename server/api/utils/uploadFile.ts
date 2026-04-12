import fs from "fs";
import path from "path";

export const uploadFile = async (file: any, folder: string) => {
  const uploadDir = path.resolve(`./public/${folder}`);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const originalName = file.filename ?? "unknown-file";
  const fileName =
    Date.now() + "-" + originalName.replaceAll(" ", "-").toLowerCase();

  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, file.data);

  return {
    name: fileName,
    path: `/${folder}/${fileName}`,
    size: file.data.length,
    type: file.type,
  };
};
