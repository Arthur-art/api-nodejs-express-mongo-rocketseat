import { Router } from 'express';

import { findOne, create } from '../models/user';

import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import { secret } from '../../config/auth.json';

const router = Router()

//Criando rota de cadastro de usuario
router.post("/register", async (req, res) => {
    //Verificando se o email ja existe no schema
    const {email} = req.body;
    try {
        if(await findOne({email})){
            res.send('Usuario já existe');
        }
        const user = await create(req.body);
        return res.send({user})
    } catch (error) {
        return res.send('Erro ao tentar criar usuario', error)

    }
});

// Criando rota de autentificacao
router.post("/authenticate", async (req, res)=>{
   const {email, password} = req.body;

   //Buscando email e senha do user no mongodb
  try{
    const user = await findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({error: "Usuario não encontrado"})
    }

    //Verificando se o password do corpo da requisicao é o mesmo do cadastrado no mongodb
    if(!await compare(password, user.password)){
        return res.status(400).send({error: 'Senha invalida'})
    }

    const token = sign({id: user.id}, secret, {
        //O token irá expirar em 1 dia
        expiresIn: 86400,
    })

    res.send({user, token});
  }catch(error){
      return res.send('error', error)
  }

   
});

// Utilizando app(expressObjeto) do index, para sempre que acessar auth/register sera executado
// o servico router de criacao de usuario
export default app => app.use('/auth', router)