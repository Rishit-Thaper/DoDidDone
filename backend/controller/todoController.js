const Todo =  require('../models/todoModel');
const mongoose = require('mongoose');

//GET all Todos
const getTodo = async(req,res)=>{
    const todos = await Todo.find({}).sort({createdAt: -1})
    res.status(200).json(todos);
}

//GET a single TODO
const getOneTodo = async(req,res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'});
    }

    const oneTodo = await Todo.findById(id)
    if(!oneTodo){
        return res.status(400).json({error: 'No such Workout'});
    }
    res.status(200).json(oneTodo);
}

//create a new TODO
const createTodo = async(req, res)=>{
    const {title, desc} = req.body
    console.log(title);
    console.log(desc);
    try{
        const todo = await Todo.create({title, desc});
        res.status(200).json(todo);
    }catch(error){
        res.status(400).json(error);
    }
}

//DELETE a TODO
const deleteTodo = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"todo invalid"});
    }
    const todo = await Todo.findOneAndDelete({_id: id})

    if(!todo){
        return res.status(400).json({msg:"todo invalid"});
    }
    res.status(200).json(todo);
}

//UPDATE a TODO
const updateTodo = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg:"todo invalid"});
    }
    
    const todo = await Todo.findByIdAndUpdate({_id: id},{
        ...req.body
    });

    if(!todo){
        return res.status(400).json({msg:"todo invalid"});
    }

    res.status(200).json(todo);
}

//Exporting Controllers
module.exports = {
    createTodo,
    getTodo,
    getOneTodo,
    deleteTodo,
    updateTodo,
} 