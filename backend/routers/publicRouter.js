import express from "express";
import {getLieu, readLieux} from "../controllers/lieuxControllers.js";
import {getPersonnage, readPersonnages} from "../controllers/personnagesControllers.js";
import {readArticles, getArticle} from "../controllers/articleControllers.js";
import { getAllUsersPublic } from "../controllers/userControllers.js";


const router = express.Router();


router.get("/wiki/lieux", readLieux);
router.get("/wiki/lieux/get-lieu/:id", getLieu);


router.get("/wiki/personnages", readPersonnages);
router.get("/wiki/personnages/get-personnage/:id", getPersonnage);


router.get("/blog/articles", readArticles);
router.get("/blog/articles/get-article/:id", getArticle);


router.get("/usersPublic", getAllUsersPublic);


export default router;