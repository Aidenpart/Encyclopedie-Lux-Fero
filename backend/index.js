import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';


import authRouter from './routers/authRouter.js';
import publicRouter from './routers/publicRouter.js';
import adminRouter from './routers/adminRouter.js'
import {auth} from './middleware/authGate.js';


dotenv.config( { path: "./.env.local" } );


const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_DB_URI;


app.use(cors());
app.use(express.static("public"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(MONGO_URI)
.then(initialisation)
.catch(err => {console.log(err.message)});


async function initialisation() {
    console.log("connexion");
    app.use("/auth", authRouter);
    app.use("/admin", [auth.verifyToken, auth.isAdmin], adminRouter);
    app.use("/", publicRouter);
} 


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});