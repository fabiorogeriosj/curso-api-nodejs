const crypto = require('crypto')
const CHAVE_CRYPTO = '123@123'

function inserir(usuario, callback) {
    usuario.senha = crypto.createHmac('sha256', usuario.senha.toString()).update(CHAVE_CRYPTO).digest('hex')
    usuario.token = crypto.createHmac('sha256', new Date().getTime().toString()).update(CHAVE_CRYPTO).digest('hex')

    MYSQL.query(
        'insert into usuarios (nome,email,senha, token) values (?,?,?,?)',
        [usuario.nome, usuario.email, usuario.senha, usuario.token],
        (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            } else {
                delete usuario.senha
                callback(null, usuario)
            }
        }
    )
}







function listar(callback) {
    MYSQL.query('select id, nome, email from usuarios', [], callback)
}
function obter(codigo, callback) {
    MYSQL.query('select id, nome, email from usuarios where id=?', [codigo], (err, data) => {
        if(err) return callback(err)
        callback(null, data[0])
    })
}


function editar(usuario, callback) {
    MYSQL.query('update usuarios set nome=?, email=? where id=?', [usuario.nome, usuario.email, usuario.id], (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            }
            if(!data.affectedRows) {
                err = { notFound:true }
                return callback(err)
            }
            callback(null, usuario)
        })
}



function excluir(codigo, callback) {
    MYSQL.query('delete from usuarios where id=?', [codigo], (err, data) => {
        if(err) {
            console.log(err)
            return callback(err)
        } 
        if(!data.affectedRows) {
            err = {
                notFound:true
            }
            return callback(err)
        }
        callback()
    })
}

function alterarSenha(objeto, callback) {
    objeto.senha_atual = crypto.createHmac('sha256', objeto.senha_atual).update(CHAVE_CRYPTO).digest('hex')
    objeto.senha_nova = crypto.createHmac('sha256', objeto.senha_nova).update(CHAVE_CRYPTO).digest('hex')
    MYSQL.query('update usuarios set senha=? where id=? and senha=?',[objeto.senha_nova, objeto.id, objeto.senha_atual], (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            } 
            if(!data.affectedRows) {
                err = {
                    notFound:true
                }
                return callback(err)
            }
            callback()
        })
}

function obterToken(token, callback) {
    MYSQL.query('select * from usuarios where token=?', [token], (err, data) => {
        if(err) return callback(err)
        callback(null, data[0])
    })
}

function obterToken(token, callback) {
    MYSQL.query('select * from usuarios where token=?', [token], (err, data) => {
        if(err) return callback(err)
        callback(null, data[0])
    })
}

function atualizaUltimaConsulta(token, callback) {
    var dataAtual = new Date().getTime()
    var limite = new limiteModel({ token: token, ultima_consulta:dataAtual })
    limite.save(callback)
}

function obterUltimaConsulta(token, callback) {
    limiteModel.find({ token: token}, (err, data) => {
        callback(null, data[0])
    }).sort({_id:-1}).limit(1)
}

module.exports = {
    inserir, listar, obter, editar, excluir, alterarSenha, 
    obterToken, atualizaUltimaConsulta, obterUltimaConsulta
}