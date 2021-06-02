const express = require('express');

const User = require('../models/User');

const router = express.Router()

//Criando rota de cadastro de usuario
router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
    } catch (error) {
        console.log('Erro ao tentar criar usuario', error)
    }
})