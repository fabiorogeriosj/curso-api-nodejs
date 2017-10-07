const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const models = require('./models')

var config = require('./config.json')

if(process.env.NODE_ENV === 'test') {
    config = require('./config_teste.json')
    
} 

mongoose.connect(config.HOST_MONGODB);

const app = express()

app.use(bodyParser.json())

console.log('\n\n', process.env.NODE_ENV)

app.use(express.static('www'))

app.post('/usuarios/logar', (req, res) => {
    models.Usuario.findOne({ email: req.body.email, senha: req.body.senha}).exec((err, data) => {
        if(err) return res.json({ message:'Erro no login' })
        if(!data || !data._id ) return res.json({ message:'Usuário ou senha incorreto!' })
        res.json({isValid: true})
    })
})

app.post('/usuarios', (req, res) => {
    var novoUsuario = new models.Usuario(req.body)
    novoUsuario.save((err, data) => {
        if(err) return res.json({message: 'Erro ao cadastrar usuário'})
        res.json(data)
    })
})



app.listen(3000)

module.exports = app //para funcionar os testes