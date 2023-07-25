const User  = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')


const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn: '3d'})
}

const loginController = async(req, res) =>{
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        
        // create Token
        const token = createToken(user._id);
        res.status(200).json({email, token});
        
    }catch(error){
        res.status(400).json({error: error.message});
    }

} 

const signController = async(req, res) =>{

    const {name, email, password} = req.body;

    try{
        const user = await User.signup(name, email, password)
        // create Token
        
        const token = createToken(user._id);
        res.status(200).json({email, token});
        
    }catch(error){
        res.status(400).json({error: error.message});
    }


    // res.json({msg: "sign up user"})
} 

module.exports = {
    loginController,
    signController,
}