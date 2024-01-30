import express from 'express';
import {register, login, getUserbyToken} from '../controllers/authControllers.js';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUserbyToken);


export default router;