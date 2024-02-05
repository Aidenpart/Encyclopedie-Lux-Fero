import express from 'express';
import {getLieu, readLieux} from '../controllers/lieuxControllers.js';
import {getPersonnage, readPersonnages} from '../controllers/personnagesControllers.js';
import {getRoman, readRomans} from '../controllers/romanControllers.js';



const router = express.Router();

router.get("/wiki/lieux", readLieux);
router.get("/wiki/lieux/get-lieu/:id", getLieu);

router.get("/wiki/personnages", readPersonnages);
router.get("/wiki/personnages/get-personnage/:id", getPersonnage);

router.get("/wiki/romans", readRomans);
router.get("/wiki/romans/get-roman/:id", getRoman);


export default router;