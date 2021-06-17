const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const Project = require("../models/project");
const Task = require("../models/task")

router.get("/", async (req, res)=>{
    res.send({user: req.userId});
});

router.post("/", async (req, res)=>{
    try{
        const project = await Project.create(req.body);
    }catch(error){
        res.status(401).send({error: 'Erro ao tentar criar um novo projeto'})
    }
});

router.put("/", async (req, res)=>{
    res.send({user: req.userId});
});

router.delete("/", async (req, res)=>{
    res.send({user: req.userId});
});

module.exports = app => app.use('/projects', router);