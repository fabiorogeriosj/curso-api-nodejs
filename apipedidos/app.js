const express = require('express')
const bodyParser = require('body-parser')
const app = express()

require('./globals')

app.use(bodyParser.json())

const usuariosController = require('./controllers/usuarios')
const pedidosController = require('./controllers/pedidos')
const clientesController = require('./controllers/clientes')
const produtosController = require('./controllers/produtos')

const usuariosPolice = require('./policies/usuarios')

//Rotas para Usuários
app.get('/usuarios', [usuariosPolice.validaLimite, usuariosPolice.validaToken, usuariosPolice.validaAdmin], usuariosController.listar)
app.post('/usuarios', usuariosController.inserir)
app.post('/usuarios/:codigo/alterarsenha', [usuariosPolice.validaToken], usuariosController.alterarSenha)
app.get('/usuarios/:codigo', [usuariosPolice.validaToken, usuariosPolice.validaAdmin], usuariosController.obter)
app.put('/usuarios/:codigo', [usuariosPolice.validaToken], usuariosController.editar)
app.delete('/usuarios/:codigo', [usuariosPolice.validaToken], usuariosController.excluir)

//Rotas para Clientes
app.get('/clientes', [usuariosPolice.validaLimite, usuariosPolice.validaToken], clientesController.listar)
app.post('/clientes', [usuariosPolice.validaToken], clientesController.inserir)
app.get('/clientes/:codigo', [usuariosPolice.validaToken], clientesController.obter)
app.put('/clientes/:codigo', [usuariosPolice.validaToken], clientesController.editar)
app.delete('/clientes/:codigo', [usuariosPolice.validaToken], clientesController.excluir)

//Rotas para Produtos
app.get('/produtos', produtosController.listar)
app.post('/produtos', produtosController.inserir)
app.get('/produtos/:codigo', produtosController.obter)
app.put('/produtos/:codigo', produtosController.editar)
app.delete('/produtos/:codigo', produtosController.excluir)


//Rotas para pedidos
app.post('/pedidos', [usuariosPolice.validaToken], pedidosController.inserir)
app.get('/pedidos', [usuariosPolice.validaLimite, usuariosPolice.validaToken], pedidosController.listar)
app.get('/pedidos/:codigo', pedidosController.obter)

app.use((req, res) => {
    TRATAR_ERRO(res, 404, 'Rota não encontrada!')
})

app.listen(8080, () => {
    console.log('API rodando na porta 8080')
})