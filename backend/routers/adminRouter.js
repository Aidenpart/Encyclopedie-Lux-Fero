import express from 'express';
import {createLieu, updateLieu, deleteLieu} from '../controllers/lieuxControllers.js';
import {createRoman, updateRoman, deleteRoman} from '../controllers/romanControllers.js';
import {createPersonnage, updatePersonnage, deletePersonnage} from '../controllers/personnagesControllers.js';
import {createFiche, updateFiche, deleteFiche} from '../controllers/ficheController.js';


const router = express.Router();

router.post("/create-lieu", createLieu);
router.post("/update-lieu/:id", updateLieu);
router.delete("/delete-lieu/:id", deleteLieu);

router.post("/create-roman", createRoman);
router.post("/update-roman/:id", updateRoman);
router.delete("/delete-roman/:id", deleteRoman);

router.post("/create-personnage", createPersonnage);
router.post("/update-personnage/:id", updatePersonnage);
router.delete("/delete-personnage/:id", deletePersonnage);

router.post("/create-fiche", createFiche);
router.post("/update-fiche/:id", updateFiche);
router.delete("/delete-fiche/:id", deleteFiche);



export default router;