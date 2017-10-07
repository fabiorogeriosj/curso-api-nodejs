const mongoose = require('mongoose')

const usuarioScheme = mongoose.Schema({
    nome: String,
    email: String,
    senha: String
})

const Usuario = mongoose.model('Usuario', usuarioScheme)

module.exports = { Usuario }