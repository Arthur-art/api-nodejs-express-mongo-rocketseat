const mongoose = require('mongoose');

//Criando tabela de usuario
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: date.now()
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;