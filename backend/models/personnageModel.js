import mongoose from "mongoose";


const personnageSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, 'Un nom est requis'],
            unique: true,
            message: "Être déja existant",
        },
        appartenance: {
            type: String,
            required: [true, 'Une appartenance est requis']
        },
        titre: {
            type: String,
            required: [true, 'Un titre est requis']
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


export default mongoose.model('Personnage', personnageSchema);