const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth.json');
const mailer = require('../../modules/mailer');

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

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        })

        //res.send({ token: token, status: 'Auth - OK', description: 'Recuperacao de senha' });

        //Se tudo for validado, será enviado o email para o usuario recuperar a senha
        mailer.sendMail({
            to: email,
            from: 'arthur.rocketseat@gmail.com',
            template: 'auth/forgotPassword',
            contex: { token }
        }, (error) => {
            if (error) {
                res.send({ error: `Erro ao tentar enviar email, ${error}` })
            } else {
                res.send({ ok: `Email enviado para ${email}` })
            }
        });

    } catch (error) {
        res.status(400).send({ error: 'Erro ao tentar recuperar senha' })
    }
});

router.post("/reset_password", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user) {
            res.send('Usuario não cadastrado');
        }
        user.password = password;

        await user.save();

        res.send({ newPassword: user.password })

    } catch (error) {
        res.send({ error: error })
    }
});

// Utilizando app(expressObjeto) do index, para sempre que acessar auth/register sera executado
// o servico router de criacao de usuario
module.exports = app => app.use('/auth', router)