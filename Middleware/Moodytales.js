const { response } = require("express");
const Moddy = require("../Models/Moodyschema");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const nodemailer=require("nodemailer");
var jwt = require('jsonwebtoken');
const { verifytoken }= require ('../jwtverify');
require('dotenv').config()

exports.Createuser = async (req, res) => {
    const { Username, Email, Phonenumber, Password } = req.body;
    const existinguser = await Moddy.findOne({ Email: Email })
    if (existinguser) {
        return res.status(400).json({ message: "Existing user find" })
    }
    const isEmailvalidate = validator.isEmail(Email);
    if (!isEmailvalidate) {
        return res.status(500).json({ message: "use email format " })

    }
    const paswordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!paswordregex.test(Password)) {
        return res.status(502).json({ message: "user Password format" })
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phonenumber)) {
        return res.status(202).json({ message: "Please enter a valid 10-digit phone number" });
    }
    try {
        const newpassword = await bcrypt.hash(Password, 10)
        const Newuser = await Moddy.create({
            Username: Username,
            Email: Email,
            Phonenumber: Phonenumber,
            Password: newpassword
        });
        return res.status(201).json({  Newuser })
    } catch (error) {
        return res.status(201).json({ message: error.message })

    }
}


exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body;
    const isEmailvalidate = validator.isEmail(Email);
    if (!isEmailvalidate) {
        return res.status(500).json({ message: "use email format " })
    }
    const paswordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!paswordregex.test(Password)) {
        return res.status(502).json({Message:"us ecorrect format of password" })
    }
    try {
        const existingUser = await Moddy.findOne({ Email: Email });
        if (existingUser) {
        const pass = existingUser.Password;
        const isMatch = await bcrypt.compare(Password, pass);
        if (isMatch) {
            var token = jwt.sign({existingUser},"terenamaaiwatansathiyo")
            return res.status(203).json({message:"user sign in success",token})
        }
        return res.status(200).json({ Message: "User not found"  });
    }
    } catch (error) {
        return res.status(500).json({  Message: error.message });
    }
};

exports.Getuser=async(req,res)=>{
    const id =req.query.id
    if(!id){
        return res.status(502).json({message:"sir plzz proovide id"})
    }
    const token =req.headers.authorization;
    try {
        const verifiedtoken= verifytoken(token)
        if(!verifiedtoken){
            return res.status(502).json({message:"sir plzz proovide token"})
        }else{
        const data = await Moddy.findOne({_id:id})
        return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({  Message: error.message });
    }

}
exports.Deleteuser=async(req,res)=>{
    const id =req.params.id
    if(!id){
        return res.status(502).json({message:"sir plzz proovide id"})
    }
    const token =req.headers.authorization;
    try {
        const verifiedtoken= verifytoken(token)
        if(!verifiedtoken){
            return res.status(502).json({message:"sir plzz proovide token"})
        }else{
        await Moddy.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"user delete succesfullt"});
        }
    } catch (error) {
        return res.status(500).json({  Message: error.message });
    }

}
exports.Updateuser = async (req,res)=> {
    const id=req.query.id
    const { Username, Email, Phonenumber, Password } = req.body;
    const isEmailvalidate = validator.isEmail(Email);
    if (!isEmailvalidate) {
        return res.status(500).json({ message: "use email format " })
    }
    const paswordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!paswordregex.test(Password)) {
        return res.status(502).json({ message: "user Password format" })
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Phonenumber)) {
        return res.status(202).json({ message: "Please enter a valid 10-digit phone number" });
    }
    const Token = req.headers.authorization
    if(!Token){
        return res.status(501).json({message:"plzz provide the token to update it"})
    }
    try {
        const VerifiedData = verifytoken(Token)
        if (!VerifiedData) {
            return res.status(501).json({ message: "existing user cannot find id" })
        }
        const Newuser= await Moddy.findByIdAndUpdate({_id:id},{
            Username: Username,
            Email: Email,
            Phonenumber: Phonenumber,
            Password:Password
        })
        return res.status(502).json({ response:Newuser})
    } catch (error) {
        return res.status(202).json({ message: error.message })
    }
}

exports.forgetpassword = async(req,res)=>{
    const {  Email } = req.body;
    const isEmailvalidate = validator.isEmail(Email);
    if (!isEmailvalidate) {
        return res.status(500).json({ message: "use email format " })
    }
    const Token = req.headers.authorization
    if(!Token){
        return res.status(501).json({message:"plzz provide the token to forget it"})
    }
    try {
        const existingUser = await Moddy.findOne({ Email: Email });
        if (!existingUser) {
            return res.status(500).json({ message: "user not found" })
        }
    } catch (error) {
        
    }
}


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
exports.modelAi=async (req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = req.body;
    try {
        const result = await model.generateContentStream(`${prompt.prompt}`);
        const response = await result.response;
        const text = response.text();
        res.status(200).json({text})
    } catch (error) {
        res.status(501).json({error:error.message})
    }
    
}