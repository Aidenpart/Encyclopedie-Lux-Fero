import ficheModel from '../models/ficheModel.js';
import {isCombinationUnique, saveImage, deleteImage, infosRoman} from '../helpers/controllersHelper.js';
import formidable from 'formidable';
import fs from 'fs/promises';


export const createFiche = async (req, res) => {

    const form = formidable();
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        let informationsRoman = await infosRoman(fields.roman[0]);

        const fiche = await ficheModel.create({
            domaine : fields.domaine[0],
            titre : fields.titre[0],
            contenuPrincipal : fields.contenuPrincipal[0],
            titreSecondaire : fields.titreSecondaire[0],
            contenuSecondaire : fields.contenuSecondaire[0],
            remarque : fields.remarque[0],
            contenuRemarque : fields.contenuRemarque[0],
            roman : informationsRoman
        });

        res.status(201).json({
            fiche : {
                _id:fiche.id,
                domaine : fiche.domaine,
                titre : fiche.titre,
                contenuPrincipal : fiche.contenuPrincipal,
                titreSecondaire : fiche.titreSecondaire,
                contenuSecondaire : fiche.contenuSecondaire,
                remarque : fiche.remarque,
                contenuRemarque : fiche.contenuRemarque,
                roman : fiche.roman
            }
        });
    } catch (error) {
        res.status(400).json({ message:error.message });
    };
};


export const getFiche = async(req, res) => {
    
    const fiche = await ficheModel.findOne({_id : req.params.id});
    res.status(200).json(fiche);
};


export const readFiches = async (req, res) => {

    const fiches = await ficheModel.find();
    res.status(200).json(fiches);
};


export const updateFiche = async (req, res) => {

    const form = formidable();
    try {
        const id = req.params.id;
        let informationsRoman = await infosRoman(fields.roman[0]);

        const updatedFiche = await ficheModel.findOneAndUpdate(
            { _id: id },
            {
                domaine : fields.domaine[0],
                titre : fields.titre[0],
                contenuPrincipal : fields.contenuPrincipal[0],
                titreSecondaire : fields.titreSecondaire[0],
                contenuSecondaire : fields.contenuSecondaire[0],
                remarque : fields.remarque[0],
                contenuRemarque : fields.contenuRemarque[0],
                roman : informationsRoman
            },
            { new: true }
        );
        res.status(201).json(updatedFiche);
    } catch (error) {
        res.status(500).json({ message:error.message });
    };
};


export const deleteFiche = async(req, res) => {

    const id = req.params.id;
    await ficheModel.findOneAndDelete({ _id: id })
    .then((data) => res.status(201).send(`${data.titre} a été supprimé`))
    .catch(() => res.status(500).json({ message: "Problème lors de la suppression ou fiche introuvable"}));
};