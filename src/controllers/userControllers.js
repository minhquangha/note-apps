const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const registerUser = async (req,res)=>{
    const {username,email,password} = req.body;
    try {
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message: "User already exist"});
        const hashPass = await bcrypt.hash(password,10);
        const user = await User.create({username,email,password: hashPass});
        res.status(201).json({ message: "User registered successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });   
    }
}

const loginUser = async (req,res) =>{
    const {email,password} =req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid email or password"});
        const checkPass = await bcrypt.compare(password,user.password);
        if(!checkPass) return res.status(400).json({message: "Invalid email or password"});
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.json(token);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {registerUser,loginUser}