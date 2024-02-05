import mongoose from 'mongoose';


const lieuSchema = new mongoose.Schema(
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
        emplacement: {
            type: String,
            required: [true, "Un emplacement est requis"]
        },
        population: {
            type: String
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


export default mongoose.model("Lieu", lieuSchema);