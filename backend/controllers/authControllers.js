import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import fs from "fs";


export const register = (req, res) => {
    
const form = formidable();
console.log("here")
    
    form.parse(req, function (err, fields, files){

        console.log("here too")

        let oldpath = files.image[0].filepath;
        let newpath = 'images/' + new Date().getTime() + "_" + files.image[0].originalFilename;
        
        fs.copyFile(oldpath,  "./public/"+newpath, function (err){
            if (err) throw err;
            UserModel.create({
                email : fields.email[0],
                pseudo : fields.pseudo[0],
                password : fields.password[0],
                image : newpath,
                isAdmin: false
            })
            .then((user) => {
                const jwt = user.createJWT();
                res.status(201).json({
                    user: {
                        _id: user.id,
                        email: user.email,
                        pseudo: user.pseudo,
                        image : newpath
                    },
                    jwt
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err.message);
            });
        });
    console.log(err);
    });

    console.log("ici")
};


export const login = async (req, res) => {
    
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        user.comparePassword(password, async(err, isMatch) => {
            
            if (err) throw err;
            
            if (isMatch) {
                const jwt = user.createJWT();
                res.status(200).json({
                    message: "Entrée validée",
                    user,
                    jwt
                });
            }else {
                res.status(400).json({message : "Entrée refusée"});
            }
        });
    }
    catch (e) {
        res.status(400).json({message : "utilisateur/utilisatrice inexistant/e"});
    }
    
};


export const getUserbyToken = (req, res) => {
    
    let token;
    
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if(!token) {
        return res.status(400).send({message : "Veuillez vous connecter"});
    }
    
    jwt.verify(token, process.env.KEY_JWT, async (err, decoded) => {
        if(err) {
            return res.status(400).send({message : "Vous n'êtes pas autorisé à entrer ici. Veuillez vous connecter ou vous inscrire"});
        }
        const user = await UserModel.findOne({_id: decoded.id});
        req.user = user;

        return res.status(200).send(user) ;
    });
};