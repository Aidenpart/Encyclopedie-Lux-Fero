import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    
    let token;
    
    if (req.headers['authorization'] !== undefined) {
        
        token = req.headers['authorization'].split(' ')[1];
        
        if (!token) {
            return res.status(403).send({message: "Pas de token fourni"});
        }

        jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: "Vous n'êtes pas autorisé à entrer ici. Veuillez vous connecter ou vous inscrire"});
            }
            
            req.userId = decoded.id;
            next();
        });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });

        if (!user) {
            return res.status(401).send({ message: "Vous n'êtes pas connecté" });
        }

        if (user.isAdmin) {
            next();
        } else {
            return res.status(403).send({ message: "Vous n'êtes pas administrateur" });
        }
    } catch (err) {
        return res.status(500).send({ message: "Erreur interne du serveur" });
    }
};


export const auth = {
    isUser,
    isAdmin,
    verifyToken
};