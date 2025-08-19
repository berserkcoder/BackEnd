import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary" , response.secure_url);
        fs.unlinkSync(localFilePath)
        return response;
    }catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temperory file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     if (!localFilePath) return null;

//     // Normalize the path (especially important for Windows)
//     const normalizedPath = path.resolve(localFilePath).replace(/\\/g, '/');

//     try {
//         const response = await cloudinary.uploader.upload(normalizedPath, {
//             resource_type: "auto",
//         });

//         console.log("File uploaded to Cloudinary:", response.url);

//         // Optional: remove local file after successful upload
//         fs.unlink(normalizedPath, (err) => {
//             if (err) console.error("Failed to delete temp file:", err);
//         });

//         return response;
//     } catch (error) {
//         console.error("Cloudinary upload failed:", error);

//         // Remove the local file even if upload fails
//         fs.unlink(normalizedPath, (err) => {
//             if (err) console.error("Failed to delete temp file:", err);
//         });

//         return null;
//     }
// };

// export { uploadOnCloudinary };
