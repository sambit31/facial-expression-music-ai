import express from "express";
import multer from "multer";
import { uploadFile } from "../service/storage.service.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        console.log("REQ BODY = ", req.body);
        console.log(req.file);

        // Upload file to ImageKit
        const fileData = await uploadFile(req.file);

        console.log(fileData);

        res.status(201).json({
            message: "Song received successfully",
            url: fileData.url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });
    }
});

export default router;
