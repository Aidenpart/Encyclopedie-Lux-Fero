import lieuModel from '../models/lieuModel.js';
import {isCombinationUnique, saveImage, deleteImage, infosRoman} from "../helpers/controllersHelper.js"
import formidable from "formidable";
import fs from "fs/promises";


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
        if (!isUnique) {
            return res.status(400).json({ message: 'La combinaison du nom et du roman doit être unique.' });
        }

        let newpath;
        if (files.image && files.image.length > 0) {
            newpath = await saveImage(files.image[0].filepath, files);
        } else {
            newpath = 'images/perso_default.jpg';
        }

        let informationsRoman = await infosRoman(fields.roman[0]);


        const lieu = await lieuModel.create({
            nom : fields.nom[0],
            roman : informationsRoman,
            appartenance : fields.appartenance[0],
            emplacement : fields.emplacement[0],
            population : fields.population[0],
            description : fields.description[0],
            image : newpath,
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
                image : lieu.image,
            }
        });
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
};


export const getLieu = async(req, res) => {
    
    const idLieu = req.params.id;

    const lieu = await lieuModel.findOne({_id : idLieu});

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
            const oldPath = files.image[0].filepath;
            newPath = 'images/' + new Date().getTime() + "_" + files.image[0].originalFilename;
        
            await deleteImage(lieuModel, id)
        
            try {
                await fs.copyFile(oldPath, "./public/" + newPath);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            newPath = 'images/perso_default.png';
        
            await deleteImage(lieuModel, id)
        }

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
    }
};





export const deleteLieu = async(req, res) => {

    const idLieu = req.params.id;
    
    await lieuModel.findOneAndDelete({ _id: idLieu })
    .then((lieu) => {
        if (lieu.image) {
            const image = "./public/"+lieu.image;
            fs.unlink(image, (err) => {
                if (err) throw err;
            });
        }
        res.status(201).send(`${lieu.nom} a été supprimé`);
    })
    .catch(() => res.status(500).json({ message: 'Problème lors de la suppression ou lieu introuvable' }));
};