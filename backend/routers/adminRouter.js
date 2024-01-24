import express from "express";
import {createLieu, updateLieu, deleteLieu} from "../controllers/lieuxControllers.js";
import {createPersonnage, updatePersonnage, deletePersonnage} from "../controllers/personnagesControllers.js";


const router = express.Router();


router.post("/create-lieu", createLieu);
router.post("/update-lieu/:id", updateLieu);
router.delete("/delete-lieu/:id", deleteLieu);


router.post("/create-personnage", createPersonnage);
router.post("/update-personnage/:id", updatePersonnage);
router.delete("/delete-personnage/:id", deletePersonnage);


export default router;