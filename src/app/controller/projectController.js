const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

const Project = require("../models/project");
const Task = require("../models/task")

router.get("/", (req, res) => {
    return res.send({ ok: 'Rodando na porta 3000, Aprendendo Node express na Rocketseat' });
});

router.get("/:project", async (req, res)=>{
    res.send({user: req.userId});
});

router.post("/", async (req, res)=>{
    res.send({ok:true, user: req.userId});
});

module.exports = app => app.use('/projects', router);