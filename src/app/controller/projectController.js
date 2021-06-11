const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get("/", (req, res) => {
    return res.send({ ok: 'Rodando na porta 3000, Aprendendo Node express na Rocketseat' })
});

module.exports = app => app.use('/projects', router);