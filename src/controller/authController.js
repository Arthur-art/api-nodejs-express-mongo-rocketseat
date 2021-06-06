const express = require('express');

const User = require('../models/user');

const router = express.Router()

//Criando rota de cadastro de usuario
router.post("/register", async (req, res) => {
    //Verificando se o email ja existe no schema
    const {email} = req.body;
    try {
        if(await User.findOne({email})){
            res.send('Usuario já existe');
        }
        const user = await User.create(req.body);
        return res.send({user})
    } catch (error) {
        return res.send('Erro ao tentar criar usuario', error)

    }
})

// Utilizando app(expressObjeto) do index, para sempre que acessar auth/register sera executado
// o servico router de criacao de usuario
module.exports = app => app.use('/auth', router)