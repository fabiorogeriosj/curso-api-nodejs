const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()
app.use(bodyParser.json())

const dbuser = process.env.DBUSER
const dbpassword = process.env.DBPASSWORD

if(!dbuser) throw new Error('Usuário do DB não definido!')
if(!dbpassword) throw new Error('Senha do DB não definido!')

mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds155674.mlab.com:55674/cursoapi`)

var clienteSchema = mongoose.Schema({
    nome: String,
    email: String,
    fone: String,
    password: String
})

var Cliente = mongoose.model('Cliente', clienteSchema)

app.post('/', (req, res) => {
    var novoCliente = new Cliente(req.body)
    novoCliente.save((err, cliente) => {
        if(err) return res.json(err)
        res.json(cliente)
    })
})

app.get('/', (req, res) => {
    Cliente.find({}, (err, clientes) => {
        if(err) return res.json(err)
        res.json(clientes)
    })
})

app.post('/login', (req, res) => {
    Cliente.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if(err) return res.json(err)
        var token = jwt.sign(req.body, 'chaveBemComplexaAqui123')
        res.json({
            success:true,
            message: 'Logged',
            token: token
        })
    })
})

app.listen(3000,  () => console.log('Example app listening on port 3000!') );