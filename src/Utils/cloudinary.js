import { v2 as cloudinary } from 'cloudinary'
import fs from "fs/promises";


//cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const cloudinaryUpload = async (filePath)=>{
    try {
        if(!filePath ) return null;
        // else upload the local file on cloudinary 
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:"auto",
        })
        //console.log("file uploaded",response.url)
         await fs.unlink(filePath); // Delete local file after successful upload
         return response
    } catch (error) {
        await fs.unlink(filePath)
        return null
    }
}

export {cloudinaryUpload}