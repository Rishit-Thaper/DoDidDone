const User  = require('../models/userModel')
const mongoose = require('mongoose')

const loginController = async(req, res) =>{
    res.json({msg: "login user"})
} 
const signController = async(req, res) =>{

    const {name, email, password} = req.body;

    try{
        const user = await User.signup(name, email, password)
        
        res.status(200).json({name, email, user});
        
    }catch(error){
        res.status(400).json({error: error.message});
    }
    // res.json({msg: "sign up user"})
} 

module.exports = {
    loginController,
    signController
}