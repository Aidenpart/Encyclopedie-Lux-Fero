import mongoose from 'mongoose';


const romanSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Un nom est requis"],
            unique: true
        },
        nombreDePages: {
            type: String
        },
        nombreDeMots: {
            type: String
        },
        nombreDeSEC: {
            type: String
        },
        nombreDeParties: {
            type: String
        },
        nombreDeChapitres: {
            type: String
        },
        isFini: {
            type: Boolean
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


export default mongoose.model("Roman", romanSchema);