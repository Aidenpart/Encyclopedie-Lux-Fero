import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Un email est requis"],
            match: /.+\@.+\..+/,
            unique: true,
            message: "Utilisateur déja existant"
        },
        pseudo: {
            type: String,
            unique: true,
            required: [true, "Un pseudo est requis"]
        },
        password: {
            type: String,
            required: [true, "Un mot de passe est requis"],
            message: "Le mot de passe doit contenir 8 caractères, dont un chiffre, un caractère spécial"
        },
        image: {
            type: String
        },
        isAdmin: {
            type: Boolean
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);


userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        const message = `Le champ "${Object.keys(error.keyValue)[0]}" doit être unique.`;
        next(new Error(message));
    } else {
        next(error);
    }
});


userSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email
        }, process.env.KEY_JWT, {expiresIn: "24h"}
    );
};


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


export default mongoose.model("User", userSchema);