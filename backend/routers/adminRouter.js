import express from "express";
import {getAllUsers, getUser} from "../controllers/adminControllers.js";
import {createLieu, updateLieu, deleteLieu} from "../controllers/lieuxControllers.js";
import {createPersonnage, updatePersonnage, deletePersonnage} from "../controllers/personnagesControllers.js";
import {newArticle, updateArticle, deleteArticle} from "../controllers/articleControllers.js";
import {deleteCommentaireByAdmin} from "../controllers/commentairesControllers.js";


const router = express.Router();


router.get("/users", getAllUsers);
router.get("/get-user", getUser);


router.post("/new-article", newArticle);
router.post("/update-article/:id", updateArticle);
router.delete("/delete-article/:id", deleteArticle);


router.delete("/delete-comment-by-admin/:id", deleteCommentaireByAdmin);


router.post("/create-lieu", createLieu);
router.post("/update-lieu/:id", updateLieu);
router.delete("/delete-lieu/:id", deleteLieu);


router.post("/create-personnage", createPersonnage);
router.post("/update-personnage/:id", updatePersonnage);
router.delete("/delete-personnage/:id", deletePersonnage);


export default router;