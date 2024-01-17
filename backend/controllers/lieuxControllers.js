import lieuModel from '../models/lieuModel.js';
import formidable from "formidable";
import fs from "fs";


export const createLieu = (req, res) => {
    
    const form = formidable();

    form.parse(req, function (err, fields, files){

        let oldpath = files.images[0].filepath;
        let newpath = 'images/' + new Date().getTime() + "_" + files.images[0].originalFilename;
        
        fs.copyFile(oldpath, "./public/"+newpath, function (err){
            if (err) throw err;
            lieuModel.create({
                nom : fields.nom[0],
                appartenance : fields.appartenance[0],
                emplacement : fields.emplacement[0],
                description : fields.description[0],
                population : fields.population[0],
                images : newpath,
            })
            .then((lieu) => {
                res.status(201).json({
                    lieu: {
                        id:lieu.id,
                        nom : lieu.nom,
                        appartenance : lieu.appartenance,
                        emplacement : lieu.emplacement,
                        description : lieu.description,
                        population : lieu.population,
                        images : lieu.images,
                    }
                });
            })
            .catch((err) => {
                res.status(400).json(err.message);
            });
        });
    });
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

    form.parse(req, async function (err, fields, files) {
        try {
            const id = req.params.id;

            let newpath = null;
            if (files.images) {
                const oldpath = files.images[0].filepath;
                newpath = 'images/' + new Date().getTime() + "_" + files.images[0].originalFilename;

                const oldLieu = await lieuModel.findById(id);
                if (oldLieu.images) {
                    const oldImagePath = "./public/" + oldLieu.images;
                    fs.unlink(oldImagePath, (err) => {
                        if (err) throw err;
                    });
                }

                fs.copyFile(oldpath, "./public/" + newpath, (err) => {
                    if (err) throw err;
                });
            }

            const updatedLieu = await lieuModel.findOneAndUpdate(
                { _id: id },
                {
                    nom: fields.nom[0],
                    appartenance: fields.appartenance[0],
                    emplacement: fields.emplacement[0],
                    description: fields.description[0],
                    population: fields.population[0],
                    images: newpath
                },
                { new: true }
            );

            res.status(201).json(updatedLieu);
        } catch (error) {
            res.status(400).json(error.message);
        }
    });
};


export const deleteLieu = async(req, res) => {

    const idLieu = req.params.id;
    
    await lieuModel.findOneAndDelete({ _id: idLieu })
    .then((lieu) => {
        if (lieu.images) {
            const image = "./public/"+lieu.images;
            fs.unlink(image, (err) => {
                if (err) throw err;
            });
        }
        res.status(201).send(`${lieu.nom} a été supprimé`);
    })
    .catch(() => res.status(500).json({ message: 'Problème lors de la suppression ou lieu introuvable' }));
};