import personnageModel from '../models/personnageModel.js';
import {isCombinationUnique, saveImage} from "../helpers/controllersHelper.js"
import formidable from "formidable";
import fs from "fs/promises";


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
        if (!isUnique) {
            return res.status(400).json({ message: 'La combinaison du nom et du roman doit être unique.' });
        }

        let newpath;
        if (files.image && files.image.length > 0) {
            newpath = await saveImage(files.image[0].filepath, files);
        } else {
            newpath = 'images/default_image.jpg';
        }

        const personnage = await personnageModel.create({
            nom: fields.nom[0],
            appartenance: fields.appartenance[0],
            demeure: fields.demeure[0],
            titrePrincipal: fields.titrePrincipal[0],
            titresSecondaires: fields.titresSecondaires[0],
            sexe: fields.sexe[0],
            specialite: fields.specialite[0],
            sousSpecialite: fields.sousSpecialite[0],
            roman: fields.roman[0],
            description: fields.description[0],
            image: newpath,
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
                specialite: personnage.specialite,
                sousSpecialite: personnage.sousSpecialite,
                roman: personnage.roman,
                description: personnage.description,
                image: newpath,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPersonnage = async(req, res) => {
    
    const idPersonnage = req.params.id;

    const personnage = await personnageModel.findOne({_id : idPersonnage});

    res.status(200).json(personnage);

};


export const readPersonnages = async (req, res) => {
    
    const personnages = await personnageModel.find();
    
    res.status(200).json(personnages);

};


export const updatePersonnage = async (req, res) => {
    const form = formidable();

    form.parse(req, async function (err, fields, files) {
        try {
            const id = req.params.id;

            let newpath = null;
            if (files.images) {
                const oldpath = files.images[0].filepath;
                newpath = 'images/' + new Date().getTime() + "_" + files.images[0].originalFilename;

                const oldPersonnage = await personnageModel.findById(id);
                if (oldPersonnage.images) {
                    const oldImagePath = "./public/" + oldPersonnage.images;
                    fs.unlink(oldImagePath, (err) => {
                        if (err) throw err;
                    });
                }

                fs.copyFile(oldpath, "./public/" + newpath, (err) => {
                    if (err) throw err;
                });
            }

            const updatedPersonnage = await personnageModel.findOneAndUpdate(
                { _id: id },
                {
                    nom: fields.nom[0],
                    appartenance: fields.appartenance[0],
                    titre: fields.titre[0],
                    description: fields.description[0],
                    images: newpath
                },
                { new: true }
            );
            res.status(201).json(updatedPersonnage);
        } catch (error) {
            res.status(400).json(error.message);
        }
    });
};

    
export const deletePersonnage = (req, res) => {
    
    const idPersonnage = req.params.id;
    
    personnageModel.findOneAndDelete({ _id: idPersonnage })
        .then((personnage) => {
            if (personnage.images) {
                const image = "./public/"+personnage.images;
                fs.unlink(image, (err) => {
                    if (err) throw err;
                });
            }
            res.status(201).send(`${personnage.nom} a été supprimé`);
        })
        .catch(() => res.status(500).json({ message: 'Problème lors de la suppression ou personnage introuvable' }));

};