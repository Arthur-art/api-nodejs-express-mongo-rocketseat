const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs  //Ler esse diretorio
        .readdirSync(__dirname)
        //Filtrando todos os arquivos desta pasta que não possuim . no começo e que não sejam o index.js
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        //Percorrendo esta pasta e adicionando o app em cada um dos arquivos
        .forEach(file => require(path.resolve(__dirname, file))(app));
}