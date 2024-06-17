import mongoose from 'mongoose';


const personnageSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Un nom est requis"]
        },
        roman: {
            type : mongoose.Schema.Types.ObjectId, 
            ref: "Roman",
            required: [true, "Un roman est requise"]
        },  
        appartenance: {
            type: String,
            required: [true, "Une appartenance est requise"]
        },
        nature: {
            type: String,
            required: [true, "Une nature est requise"]
        },
        demeure: {
            type: String,
            required: [true, "Une demeure est requise"]
        },
        titrePrincipal: {
            type: String,
            required: [true, "Un titre principal est requis"]
        },
        titresSecondaires: {
            type: String
        },
        sexe: {
            type: String
        },
        attirance: {
            type: String
        },                       
        specialite: {
            type: String,
            required: [true, "Une specialite est requise"]
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


export default mongoose.model("Personnage", personnageSchema);