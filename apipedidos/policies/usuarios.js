


const usuariosDb = require('../database/usuarios')

function validaToken(req, res, next) {
    if(!req.headers.token) return TRATAR_ERRO(res, 401, 'Informe o token!')
    usuariosDb.obterToken(req.headers.token, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Nâo foi possível verificar o token!')
        if(!data) return TRATAR_ERRO(res, 401, "Token não existe!")
        req.usuario = data
        next()
    })
}

function validaAdmin(req, res, next) {
    if(!req.usuario.admin) return TRATAR_ERRO(res, 401, 'Usuário não é ADMIN!')
    next()
}

function validaLimite(req, res, next) {
    if(!req.headers.token) return TRATAR_ERRO(res, 401, 'Informe o token!')
    usuariosDb.obterUltimaConsulta(req.headers.token, (err, data) => {
        if(err) return TRATAR_ERRO(res, 500, 'Nâo foi possível verificar consulta!')
        var dataUltimoConsulta = data ? data.ultima_consulta : null
        var dataAtual = new Date().getTime()
        if(!dataUltimoConsulta || dataAtual - dataUltimoConsulta >= 5000) {
            usuariosDb.atualizaUltimaConsulta(req.headers.token, (err, data) => {
                if(err) return TRATAR_ERRO(res, 500, 'Erro!')
                next()
            })
        } else {
            return TRATAR_ERRO(res, 401, 'Limite de consulta excedida!')
        }
    })
}
module.exports = { validaToken, validaAdmin, validaLimite }