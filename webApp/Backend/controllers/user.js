const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();

const register = async (req, res) => {
    try {
        let { username, email, password } = req.body;

       
        if (!username || !email || !password) {
            return res.status(400).send({ msg: "All credentials are required!", status: false });
        }

     
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({ msg: "Username/Email already taken, login or register!", status: false });
        }

        let hashPassword = await bcrypt.hash(password, 10);
        let newUser = await User.create({ username, email, password: hashPassword });

      
        let userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        return res.status(200).json({
            msg: "Created Successfully, try to login!",
            status: true,
            user: userResponse
        });
        

    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Server Error", status: false });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).send({ msg: "Email and Password are required!", status: false });
        }

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ msg: "User does not exist, please register first!", status: false });
        }

   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ msg: "Wrong password", status: false });
        }

       
        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).send({ msg: "Logged in successfully!", status: true, token });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Server failed", status: false });
    }
};

module.exports = { register, login };