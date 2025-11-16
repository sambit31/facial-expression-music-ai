import express from "express";
import dotenv from "dotenv"
import { ConnectDb } from "./src/db/db.js";

dotenv.config();

const app = express();

ConnectDb();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`);
})