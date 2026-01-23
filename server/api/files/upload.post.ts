import filesModel from "../../models/Files";
import fs from "fs";
import path from "path";
import { object, string } from "yup";

export default defineEventHandler(async (event) => {
    
    const formData = await readMultipartFormData(event),
          uploadedFiles = [];      
          
    if (!formData || !formData.length) {
        return { error: "هیچ فایلی ارسال نشده است." };
    }
  
    const uploadDir = path.resolve("./public/music");
  
      // اطمینان از وجود دایرکتوری آپلود
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
  
    try {

      for (const file of formData) {        
        // تولید نام جدید برای فایل
        const newFileName = file?.filename.replaceAll(" ", "-").toLocaleLowerCase();// نام جدید با 
        const filePath = path.resolve(uploadDir, newFileName);
     console.log(formData);
      // ذخیره فایل با نام جدید
      fs.writeFileSync(filePath, file.data);
      uploadedFiles.push(newFileName);
    
      const dataFileForDatabase = {
            fileName: newFileName.substring(0, newFileName.length - 4),
            path: `music/${newFileName}`,
            size: "",
            type: file.type,
            poster: "../public/images/god.jpg",
            status: "waiting",
            context: "",
            loves: [1,2]
        };
        await filesModel.create(dataFileForDatabase);
      }

     return { 
         message: "فایل‌ها با موفقیت آپلود شدند.",
         files: uploadedFiles 
        };
    }

    catch (error) {
        createError({
            statusCode: 500, statusMessage: 'good'
        })
    }
})