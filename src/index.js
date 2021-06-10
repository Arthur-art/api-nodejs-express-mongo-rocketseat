import express from 'express';
import { json, urlencoded } from 'body-parser';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }))

app.listen(3000, console.log("Rodando na porta 3000"))
app.get("/rocketseat", (req, res) => {
    return res.send("Estudando NodeJs-express na Rocketseat")
});

//Repassando para o controller o app
require('./controller/index')(app);
