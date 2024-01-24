import fs from "fs/promises";


export const isCombinationUnique = async (model, first, second) => {
    try {
        const existingData = await model.findOne({ nom: first, roman: second });
        return !existingData;
    } catch (error) {
        throw new Error('Error checking combination uniqueness: ' + error.message);
    }
};


export const saveImage = async (oldpath, files) => {
    const newpath = 'images/' + new Date().getTime() + "_" + files.image[0].originalFilename;
    await fs.copyFile(oldpath, "./public/" + newpath);
    return newpath;
};