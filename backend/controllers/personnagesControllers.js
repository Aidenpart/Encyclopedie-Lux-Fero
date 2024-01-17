import personnageModel from '../models/personnageModel.js';
import formidable from "formidable";
import fs from "fs";


export const createPersonnage = (req, res) => {
    
    const form = formidable();
    
    form.parse(req, function (err, fields, files){

        let oldpath = files.images[0].filepath;
        let newpath = 'images/' + new Date().getTime() + "_" + files.images[0].originalFilename;
        
        fs.copyFile(oldpath,  "./public/"+newpath, function (err){
            if (err) throw err;
            personnageModel.create({
                nom : fields.nom[0],
                appartenance : fields.appartenance[0],
                titre : fields.titre[0],
                description : fields.description[0],
                images : newpath,
            })
            .then((personnage) => {
                res.status(201).json({
                    personnage: {
                        _id : personnage.id,
                        nom : personnage.nom,
                        appartenance : personnage.appartenance,
                        titre : personnage.titre,
                        description : personnage.description,
                        images : personnage.images,
                    }
                });
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
        });
    console.log(err);
    });
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