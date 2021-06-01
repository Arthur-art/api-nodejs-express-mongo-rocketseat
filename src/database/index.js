const mongoose = require('mongoose');

//Conectando com o banco de dados
mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
