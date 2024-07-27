const bcrypt = require("bcryptjs");
const Admin = require("../Models/Adminschema");
const jwt = require('jsonwebtoken');


exports.CreateAdmin = async (req, res) => {
    const { Email, Password } = req.body;
    console.log(Email);
    try {
        const existingEmail = await Admin.findOne({ Email: Email });
        if (existingEmail) {
            return res.status(401).json({ message: "Existing email not allowed" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(401).json({ message: "Use valid email format" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newAdmin = new Admin({
            Email: Email,
            Password: hashedPassword
        });
        await newAdmin.save();
        return res.status(201).json({ response: newAdmin });
    } catch (error) {
        return res.status(501).json({ message: error.message });
    }
};



exports.LoginAdmin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const existinguser = await Admin.findOne({ Email: Email });
        if (existinguser) {
            const pass = existinguser.Password;
            const check = await bcrypt.compare(Password, pass); 
            if (check) {
                const token = jwt.sign({ existinguser }, "Adminkisecretkeysekarega", { expiresIn: '8h' });
                return res.status(200).json({ message: "User sign in success", token });
            }
            return res.status(401).json({ message: "Please provide the correct credentials" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





