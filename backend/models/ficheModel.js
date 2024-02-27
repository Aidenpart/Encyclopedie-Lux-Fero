import mongoose from 'mongoose';


const ficheSchema = new mongoose.Schema(
    {
        domaine: {
            type: String,
            required: [true, "Un  est requise"]
        },   
        titre: {
            type: String,
            required: [true, "Un  est requise"]
        },
        contenuPrincipal: {
            type: String,
            required: [true, "Un  est requis"]
        },
        titreSecondaire: {
            type: String
        },
        contenuSecondaire: {
            type: String
        },
        remarque: {
            type: String
        },
        contenuRemarque: {
            type: String
        },
        roman: {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "Roman",
            required: [true, "Un roman est requise"]
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model("Fiche", ficheSchema);