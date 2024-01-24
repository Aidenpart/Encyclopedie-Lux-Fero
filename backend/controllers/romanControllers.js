import romanModel from '../models/romanModel.js';
import formidable from "formidable";


export const createRoman = (req, res) => {
    
    const form = formidable();
    form.parse(req, function (err, fields){
    
        romanModel.create({
            nom: fields.nom[0],
            nombreDePages: fields.nombreDePages[0],
            nombreDeMots: fields.nombreDeMots[0],
            nombreDeSEC: fields.nombreDeSEC[0],
            nombreDeParties: fields.nombreDeParties[0],
            nombreDeChapitres: fields.nombreDeChapitres[0],
            isFini: false             
        })
        .then((roman) => {
            res.status(201).json(roman);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("erreur lors de la creation du roman");
        });
    });
};


export const getRoman = async(req, res) => {
    
    const idRoman = req.params.id;
    const roman = await romanModel.findOne({_id : idRoman});
    res.status(200).json(roman);

};


export const readRomans = async (req, res) => {

    const romans = await romanModel.find();
    res.status(200).json(romans);

};


export const updateRoman = async (req, res) => {

    const romanId = req.params.id;

    const form = formidable();
    form.parse(req, function (err, fields, files){

        romanModel.findOne({ _id: romanId })
        .then((romanFound) => {
            if (!romanFound) {
                return res.status(404).json({ message: "roman introuvable" });
            }else {
                romanModel.findOneAndUpdate(
                    {_id : romanId}, 
                    {
                        nom: fields.nom[0],
                        nombreDePages: fields.nombreDePages[0],
                        nombreDeMots: fields.nombreDeMots[0],
                        nombreDeSEC: fields.nombreDeSEC[0],
                        nombreDeParties: fields.nombreDeParties[0],
                        nombreDeChapitres: fields.nombreDeChapitres[0],
                    }, 
                    {new: true}
                )            
                .then((roman) => {
                    res.status(200).json(roman);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la modification du roman" });
        });
    });
};


export const deleteRoman = async (req, res) => {
    
    const romanId = req.params.id;

    romanModel.findOne({ _id: romanId })
    .then((romanFound) => {
        if (!romanFound) {
            return res.status(404).json({ message: "roman introuvable" });
        }else {
            romanModel.findOneAndDelete({_id: roman.id})
            .then((roman) => {
                res.status(200).json(roman);
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du roman" });
    });
    
};