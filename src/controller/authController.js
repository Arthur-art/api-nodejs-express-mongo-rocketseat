const express = require('express');

const User = require('../models/user');

const router = express.Router()

//Criando rota de cadastro de usuario
router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.send({user})
    } catch (error) {
        console.log('Erro ao tentar criar usuario', error)
    }
})

// Utilizando app(expressObjeto) do index, para sempre que acessar auth/register sera executado
// o servico router de criacao de usuario
module.exports = app => app.use('/auth', router)