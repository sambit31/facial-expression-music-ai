import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL
});

export function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
                file: file.buffer,        
                fileName: file.originalname,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
    });
}

export default imagekit;
