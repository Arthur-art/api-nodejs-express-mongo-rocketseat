const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, console.log("Rodando na porta 3000"))
app.get("/rocketseat", (req, res) => {
    return res.send("Estudando NodeJs-express na Rocketseat")
});

require('./controller/authController')(app);