import express from "express";
import multer from "multer";
import { uploadFile } from "../service/storage.service.js";
import { SongModel } from "../models/song.model.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        //console.log("REQ BODY = ", req.body);
       // console.log("REQ File = ", req.file);

        // Upload file to ImageKit
        const fileData = await uploadFile(req.file);
        
        //console.log(fileData);
 
        const song = await SongModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
        });

        res.status(201).json({
            message: "Song received successfully",
            song: song
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });
    }
});

router.get('/songs',async(req,res) => {
    const {mood} = req.query;

    const songs = await SongModel.find({
        mood: mood
    })

    res.status(200).json({
        message:"Songs fetched success",
        song:songs
    })
})

export default router;
