import { Router } from 'express';
const router = Router();
import authMiddleware from '../middlewares/auth';

router.use(authMiddleware)

router.get("/", (req,res)=>{
    return res.send({ok:'Rodando na porta 3000, Aprendendo Node express na Rocketseat'})
});

export default app => app.use('/projects', router);