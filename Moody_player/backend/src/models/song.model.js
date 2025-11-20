import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    audio: String,
    mood: String,
})

export const SongModel = mongoose.model('Song',songSchema);