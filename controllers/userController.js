import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken = (id) => {
   return jwt.sign({id},process.env.JWT_SECRET);
}

export const signup = async (req, res) => {

    const {name, email, password} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if (exist) {
            return res.json({success: false, message: "User Already Exist."});
        }

        //Validating Email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email."});
        }

        if(password.length < 4){
           return res.json({success: false, message: "Password must be at least 4 characters."});
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
       const user = await newUser.save();
       
        const token = createToken(user._id);
        res.json({success: true,message: "Registered Successfully!", token});

    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Error saving user."});
    }
}

export const login = async (req, res) => {

    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User not found."});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: "Incorrect password."});
        }
}
catch (error) {
    console.error(error);
    res.json({success: false, message: "Error while logging in..."});
}
}