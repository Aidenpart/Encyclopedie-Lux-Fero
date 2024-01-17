import mongoose from "mongoose";


const lieuSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, 'Un nom est requis'],
            unique: true,
            message: "Lieu déja existant",
        },
        appartenance: {
            type: String,
            required: [true, 'Une appartenance est requis']
        },
        emplacement: {
            type: String,
            required: [true, 'Un emplacement est requis']
        },
        population: {
            type: String
        },
        description: {
            type: String
        },
        images: {
            type: String
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model('Lieu', lieuSchema);