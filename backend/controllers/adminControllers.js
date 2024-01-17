import UserModel from "../models/userModel.js";


export const getAllUsers = async(req, res) => {
    
    const users = await UserModel.find();
    
    res.status(200).json(users);
    
};


export const getUser = async(req, res) => {
    
    const mailUser = req.body.email;
    
    const user = await UserModel.findOne({email : mailUser});
    
    res.status(200).json(user);
    
};