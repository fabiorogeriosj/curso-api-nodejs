const usuariosDb = require('../database/usuarios')
function listar(req, res) {
    usuariosDb.listar((err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        res.json(data)
    })
}



function inserir(req, res) {
    if(!req.body.nome) return TRATAR_ERRO(res, 400, 'Campo nome é obrigatório!')
    if(!req.body.email) return TRATAR_ERRO(res, 400, 'Campo email é obrigatório!')
    if(!req.body.senha) return TRATAR_ERRO(res, 400, 'Campo senha é obrigatório!')
    usuariosDb.inserir(req.body, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        res.json(data)
    })
}

function editar(req, res) {
    if(!req.params.codigo) return TRATAR_ERRO(res, 400, 'Campo código é obrigatório!')
    if(!req.body.nome) return TRATAR_ERRO(res, 400, 'Campo nome é obrigatório!')
    if(!req.body.email) return TRATAR_ERRO(res, 400, 'Campo email é obrigatório!')
    if(req.body.senha) return TRATAR_ERRO(res, 403, 'Não é permitido editar senha neste recurso!')
    req.body.id = req.params.codigo
    usuariosDb.editar(req.body, (err, data) => {
        if(err && err.notFound) return TRATAR_ERRO(res, 404, 'Usuário não existe!')
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao editar!')
        res.json(data)
    })
}

function obter(req, res) {
    usuariosDb.obter(req.params.codigo, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Erro no banco de dados!')
        if(!data) return TRATAR_ERRO(res, 404, 'Usuário não encontrado!')
        res.json(data)
    })
}
function excluir(req, res) {
    usuariosDb.excluir(req.params.codigo, (err, data) => {
        if(err && err.notFound) return TRATAR_ERRO(res, 404, 'Usuário não existe!')
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao excluir!')
        res.end('Excluido com sucesso!')
    })
}

function alterarSenha(req, res) {
    if(!req.params.codigo) return TRATAR_ERRO(res, 400, 'Código não informado!')
    if(!req.body.senha_atual) return TRATAR_ERRO(res, 400, 'Campo senha_atual é obrigatório!')
    if(!req.body.senha_nova) return TRATAR_ERRO(res, 400, 'Campo senha_nova é obrigatório!')
    req.body.id = req.params.codigo
    usuariosDb.alterarSenha(req.body, (err, data) => {
        if(err && err.notFound) return TRATAR_ERRO(res, 404, 'Usuário não existe!')
        if(err) return TRATAR_ERRO(res, 500, 'Erro ao excluir!')
        res.end('Senha alterada com sucesso!')
    })
}

module.exports = { listar, inserir, editar, obter, excluir, alterarSenha }