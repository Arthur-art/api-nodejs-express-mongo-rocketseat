const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth.json');

const router = express.Router()

//Criando rota de cadastro de usuario
router.post("/register", async (req, res) => {
    //Verificando se o email ja existe no schema
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            res.send('Usuario já existe');
        }
        const user = await User.create(req.body);
        return res.send({ user })
    } catch (error) {
        return res.send('Erro ao tentar criar usuario', error)

    }
});

// Criando rota de autentificacao
router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;

    //Buscando email e senha do user no mongodb
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: "Usuario não encontrado" })
        }

        //Verificando se o password do corpo da requisicao é o mesmo do cadastrado no mongodb
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Senha invalida' })
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            //O token irá expirar em 1 dia
            expiresIn: 86400,
        })

        res.send({ user, token });
    } catch (error) {
        return res.send('error', error)
    }


});

// Rota para recuperacao de senha
router.post("/forgot_password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = User.findOne({ email });

        if (!user) {
            res.status(400).send('Usuario não cadastrado')
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);




    } catch (error) {
        res.status(400).send({ error: 'Erro ao tentar recuperar senha' })
    }
})

// Utilizando app(expressObjeto) do index, para sempre que acessar auth/register sera executado
// o servico router de criacao de usuario
module.exports = app => app.use('/auth', router)