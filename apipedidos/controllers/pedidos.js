const pedidosDb = require('../database/pedidos')

function inserir(req, res) {
    req.body.id_usuario = req.usuario.id
    pedidosDb.inserir(req.body, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao inserir pedido')
        res.json(data)
    })
}

function listar(req, res) {
    pedidosDb.listar((err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        res.json(data)
    })
}

function obter(req, res) {
    pedidosDb.obter(req.params.codigo, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        if(!data) return TRATAR_ERRO(res, 404, 'Pedido não encontrado!')
        res.json(data)
    })
}

module.exports = { inserir, listar, obter }