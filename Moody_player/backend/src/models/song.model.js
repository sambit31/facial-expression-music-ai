import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    audio: String,
})

export const song = mongoose.model('Song',songSchema);