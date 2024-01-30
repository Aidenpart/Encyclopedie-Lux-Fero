import lieuModel from '../models/lieuModel.js';
import {isCombinationUnique, saveImage, deleteImage, infosRoman} from '../helpers/controllersHelper.js';
import formidable from 'formidable';
import fs from 'fs/promises';


export const createLieu = async (req, res) => {

    const form = formidable();
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const isUnique = await isCombinationUnique(lieuModel, fields.nom[0], fields.roman[0]);
        if(!isUnique)
            return res.status(400).json({ message: "La combinaison du nom et du roman doit être unique."});

        let newPath;
        if (files.image && files.image.length > 0) {
            newPath = await saveImage(files.image[0].filepath, files);
        } else {
            newPath = "images/perso_default.jpg";
        };

        let informationsRoman = await infosRoman(fields.roman[0]);

        const lieu = await lieuModel.create({
            nom : fields.nom[0],
            roman : informationsRoman,
            appartenance : fields.appartenance[0],
            emplacement : fields.emplacement[0],
            population : fields.population[0],
            description : fields.description[0],
            image : newPath
        });

        res.status(201).json({
            lieu: {
                _id:lieu.id,
                nom : lieu.nom,
                roman : lieu.roman,
                appartenance : lieu.appartenance,
                emplacement : lieu.emplacement,
                description : lieu.description,
                population : lieu.population,
                image : lieu.image
            }
        });
    } catch (error) {
        res.status(500).json({ message:error.message });
    };
};


export const getLieu = async(req, res) => {
    
    const lieu = await lieuModel.findOne({_id : req.params.id});
    res.status(200).json(lieu);
};


export const readLieux = async (req, res) => {

    const lieux = await lieuModel.find();
    res.status(200).json(lieux);
};


export const updateLieu = async (req, res) => {

    const form = formidable();
    try {
        const id = req.params.id;

        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        let newPath;
        if (files.image && files.image.length > 0) {
            newPath = await saveImage(files.image[0].filepath, files);
            await deleteImage(lieuModel, id);
        } else {
            newPath = "images/perso_default.png";       
            await deleteImage(lieuModel, id);
        };

        let informationsRoman = await infosRoman(fields.roman[0]);

        const updatedLieu = await lieuModel.findOneAndUpdate(
            { _id: id },
            {
                nom : fields.nom[0],
                roman : informationsRoman,
                appartenance : fields.appartenance[0],
                emplacement : fields.emplacement[0],
                population : fields.population[0],
                description : fields.description[0],
                image : newPath
            },
            { new: true }
        );
        res.status(201).json(updatedLieu);
    } catch (error) {
        res.status(500).json({ message:error.message });
    };
};


export const deleteLieu = async(req, res) => {

    const id = req.params.id;
    await deleteImage(lieuModel, id)
    await lieuModel.findOneAndDelete({ _id: id })
    .then((data) => res.status(201).send(`${data.nom} a été supprimé`))
    .catch(() => res.status(500).json({ message: "Problème lors de la suppression ou lieu introuvable"}));
};