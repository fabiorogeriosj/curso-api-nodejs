const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static('public'))

const produtosController = require('./controllers/produtos')

app.get('/produtos', produtosController.list)

app.listen(3000, function () {
  console.log('Rodando na porta 3000!')
})
