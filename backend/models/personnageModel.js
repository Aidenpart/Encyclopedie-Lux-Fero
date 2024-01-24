import mongoose from "mongoose";


const personnageSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, 'Un nom est requis'],
            message: "Être déja existant"
        },
        appartenance: {
            type: String,
            required: [true, 'Une appartenance est requise']
        },
        demeure: {
            type: String,
            required: [true, 'Une demeure est requise']
        },
        titrePrincipal: {
            type: String,
            required: [true, 'Un titre principal est requis']
        },
        titresSecondaires: {
            type: String
        },
        sexe: {
            type: String
        },                        
        specialite: {
            type: String,
            required: [true, 'Une specialite est requise']
        },
        sousSpecialite: {
            type: String,
            required: [true, 'Une ou des sous-specialites sont requises']
        },        
        roman: {
            type: String,
            required: [true, 'Un roman est requis']
        },        
        description: {
            type: String
        },
        image: {
            type: String
        },
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model('Personnage', personnageSchema);