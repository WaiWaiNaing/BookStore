import express, { response } from "express";
import {PORT, URL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type']
// }));

app.get("/", (req, res)=>{
    console.log(req);
    return res.status(234).send("MERN Tutorial");
});

app.use("/books", bookRoute);

mongoose
    .connect(URL)
    .then(() => {
        console.log("App connected DB");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })
