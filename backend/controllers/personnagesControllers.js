import personnageModel from '../models/personnageModel.js';
import {isCombinationUnique, saveImage, deleteImage, infosRoman} from '../helpers/controllersHelper.js'
import formidable from 'formidable';
import fs from 'fs/promises';


export const createPersonnage = async (req, res) => {
    
    const form = formidable();
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const isUnique = await isCombinationUnique(personnageModel, fields.nom[0], fields.roman[0]);
        if (!isUnique)
            return res.status(400).json({ message: "La combinaison du nom et du roman doit être unique." });

        let newPath;
        if (files.image && files.image.length > 0) {
            newPath = await saveImage(files.image[0].filepath, files);
        } else {
            newPath = "images/perso_default.png";
        };

        let informationsRoman = await infosRoman(fields.roman[0]);

        const personnage = await personnageModel.create({
            nom: fields.nom[0],            
            roman: informationsRoman,
            appartenance: fields.appartenance[0],
            demeure: fields.demeure[0],
            titrePrincipal: fields.titrePrincipal[0],
            titresSecondaires: fields.titresSecondaires[0],
            sexe: fields.sexe[0],
            attirance: fields.attirance[0],
            specialite: fields.specialite[0],
            sousSpecialite: fields.sousSpecialite[0],
            description: fields.description[0],
            image: newPath
        });

        res.status(201).json({
            personnage: {
                _id: personnage.id,
                nom: personnage.nom,
                appartenance: personnage.appartenance,
                demeure: personnage.demeure,
                titrePrincipal: personnage.titrePrincipal,
                titresSecondaires: personnage.titresSecondaires,
                sexe: personnage.sexe,
                attirance: personnage.attirance,
                specialite: personnage.specialite,
                sousSpecialite: personnage.sousSpecialite,
                roman: personnage.roman,
                description: personnage.description,
                image: newPath
            }
        });
    } catch (error) {
        res.status(500).json({ message:error.message });
    };
};


export const getPersonnage = async(req, res) => {
    
    const personnage = await personnageModel.findOne({_id : req.params.id});
    res.status(200).json(personnage);
};


export const readPersonnages = async (req, res) => {
    
    const personnages = await personnageModel.find();
    res.status(200).json(personnages);
};


export const updatePersonnage = async (req, res) => {
    
    const form = formidable();
    try {
        const id = req.params.id;

        const {fields, files} = await new Promise((resole, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resole({fields, files});
            });
        });

        let newPath;
        if (files.image && files.image.length > 0) {
            newPath = await saveImage(files.image[0].filepath, files);           
            await deleteImage(personnageModel, id);
        } else {
            newPath = "images/perso_default.png";           
            await deleteImage(personnageModel, id);
        }

        let informationsRoman = await infosRoman(fields.roman[0]);

        const updatedPersonnage = await personnageModel.findOneAndUpdate(
            { _id: id },
            {
                nom: fields.nom[0],
                roman: informationsRoman,
                appartenance: fields.appartenance[0],
                demeure: fields.demeure[0],
                titrePrincipal: fields.titrePrincipal[0],
                titresSecondaires: fields.titresSecondaires[0],
                sexe: fields.sexe[0],
                attirance: fields.attirance[0],
                specialite: fields.specialite[0],
                sousSpecialite: fields.sousSpecialite[0],
                description: fields.description[0],
                image: newPath
            },
            { new: true }
        );
        res.status(201).json(updatedPersonnage);
    } catch (error) {
        res.status(400).json(error.message);
    };
};


export const deletePersonnage = async(req, res) => {

    await deleteImage(personnageModel, req.params.id)
    await personnageModel.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.status(201).send(`${data.nom} a été supprimé`))
    .catch(() => res.status(500).json({ message: "Problème lors de la suppression ou lieu introuvable"}));
};