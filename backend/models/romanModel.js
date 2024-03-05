import mongoose from 'mongoose';


const romanSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Un nom est requis"],
            unique: true
        },
        nombreDePages: {
            type: Number
        },
        nombreDeMots: {
            type: Number
        },
        nombreDeSEC: {
            type: Number
        },
        nombreDeParties: {
            type: Number
        },
        nombreDeChapitres: {
            type: Number
        },
        resume : {
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