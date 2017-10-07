const ticketDb = require('../database/tickets')

function tratarErro(res, err) {
    console.log(err)
    res.writeHead(500)
    return res.end('Erro no banco de dados!')
}

function listar(req, res) {
    ticketDb.listar((err, result) => {
        if(err) return tratarErro(res, err)
        res.json(result)
    })
}

function inserir(req, res) {
    ticketDb.inserir(req.body, (err, result) => {
        if(err) return tratarErro(res, err)
        res.end('Salvo com sucesso!')
    })
}

function obter(req, res) {
    //
}

function editar(req, res) {
    //
}

function excluir(req, res) {
    //
}

module.exports = { listar, inserir, obter, editar, excluir }
