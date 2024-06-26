import fs from 'fs/promises';
import romanModel from '../models/romanModel.js';


export const isCombinationUnique = async (model, nom, roman) => {

    const idRoman = await findIdRoman(roman)
    try {
        const existingData = await model.findOne({ nom: nom, roman: idRoman._id });
        return !existingData;
    } catch (error) {
        throw new Error("Error checking combination uniqueness: " + error.message);
    };
};


const findIdRoman = async (nom) => {

    try {
        const roman = await romanModel.findOne({ nom: nom});
        const idRoman = roman._id
        return idRoman;
    } catch (error) {
        throw new Error("Error : " + error.message);
    };
};


export const infosRoman = async (nom) => {

    try {
        const roman = await romanModel.findOne({ nom: nom});
        return roman;
    } catch (error) {
        throw new Error("Error : " + error.message);
    };
};


export const saveImage = async (oldPath, files) => {

    const newPath = "images/" + new Date().getTime() + "_" + files.image[0].originalFilename;
    await fs.copyFile(oldPath, "./public/" + newPath);
    return newPath;
};


export const deleteImage = async (model, id) => {

    const oldData = await model.findById(id);
    const oldImagePath = "./public/" + oldData.image;

    if (oldImagePath !== "./public/images/perso_default.png" && oldImagePath !== "./public/images/lieu_default.jpg" && oldImagePath !== "./public/images/mage_default.png") {
        fs.unlink(oldImagePath, (err) => {
            if (err) throw err;
        });
    };
};