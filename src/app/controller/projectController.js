const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const Project = require("../models/project");
const Task = require("../models/task")

router.get("/", async (req, res)=>{
    try{
        const projects = await Project.find().populate('user');
        return res.send({projects}) 
    }catch(error){
       return res.status(401).send({error: error});
    }
});

router.get("/:projectId", async (req, res)=>{
    try{
        const projects = await Project.findById(req.params.projectId).populate('user');
        return res.send({projects}) 
    }catch(error){ 
       return res.status(401).send({error: error});
    }
});

router.post("/", async (req, res)=>{
    try{
        const project = await Project.create({...req.body, user: req.userId});
        return res.send({project});
    }catch(error){
       return res.status(401).send({error: 'Erro ao tentar criar um novo projeto'})
    }
});

router.put("/", async (req, res)=>{
    res.send({user: req.userId});
});

router.delete("/:projectId", async (req, res)=>{
    try{
        await Project.findByIdAndRemove(req.params.projectId);
        return res.send({delete: true}) 
    }catch(error){ 
       return res.status(401).send({error: error});
    }
});

module.exports = app => app.use('/projects', router);