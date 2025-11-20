import express from "express";
import dotenv from "dotenv";
import songRoutes from "./src/routes/song.routes.js"
import { ConnectDb } from "./src/db/db.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

//middleware
app.use(express.json());
//routes
app.use('/',songRoutes);

//db
ConnectDb();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`);
})