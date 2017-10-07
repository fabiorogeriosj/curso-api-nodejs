const produtosDb = require('../database/produtos')

function listar(req, res) {
    produtosDb.listar((err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        res.json(data)
    })
}



function inserir(req, res) {
    if(!req.body.nome) return TRATAR_ERRO(res, 400, 'Campo nome é obrigatório!')
    if(!req.body.foto) return TRATAR_ERRO(res, 400, 'Campo foto é obrigatório!')
    if(!req.body.preco) return TRATAR_ERRO(res, 400, 'Campo preco é obrigatório!')
    produtosDb.inserir(req.body, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        res.json(data)
    })
}

function editar(req, res) {
    if(!req.params.codigo) return TRATAR_ERRO(res, 400, 'Campo código é obrigatório!')
    if(!req.body.nome) return TRATAR_ERRO(res, 400, 'Campo nome é obrigatório!')
    if(!req.body.foto) return TRATAR_ERRO(res, 400, 'Campo foto é obrigatório!')
    if(!req.body.preco) return TRATAR_ERRO(res, 400, 'Campo preco é obrigatório!')
    req.body.id = req.params.codigo
    produtosDb.editar(req.body, (err, data) => {
        if(err && err.notFound) return TRATAR_ERRO(res, 404, 'Cliente não existe!')
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao editar!')
        res.json(data)
    })
}

function obter(req, res) {
    produtosDb.obter(req.params.codigo, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        if(!data) return TRATAR_ERRO(res, 404, 'Cliente não encontrado!')
        res.json(data)
    })
}

function excluir(req, res) {
    produtosDb.excluir(req.params.codigo, (err, data) => {
        if(err && err.notFound) return TRATAR_ERRO(res, 404, 'Cliente não existe!')
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao excluir!')
        res.end('Excluido com sucesso!')
    })
}

module.exports = { listar, inserir, editar, obter, excluir }