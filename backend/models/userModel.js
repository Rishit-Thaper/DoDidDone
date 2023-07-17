const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const validator =  require('validator');
const { validate } = require('./todoModel');
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }

})

//static signup

userSchema.statics.signup = async function(name, email, password){

    if(!email || !password || !name){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password must be strong');
    }
    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already exists');
    }
    
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hash});

    return user;
}

module.exports = mongoose.model('user', userSchema)