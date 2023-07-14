require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const todoRoute = require('./routes/todo')
app.use(express.json());

app.use(cors());
app.use(session({
    secret:'user in session',
    saveUninitialized: true,
    resave: false,
}))

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`Server Started at ${process.env.PORT}`);
        })
        console.log(`database connected at ${process.env.MONGODB_URI}`);
    })
    .catch((error)=>{
        console.log(error);
    })


    app.use('/todos', todoRoute);

