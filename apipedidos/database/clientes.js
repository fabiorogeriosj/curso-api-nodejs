
function inserir(cliente, callback) {
    MYSQL.query(
        'insert into clientes (nome,fone,email,cidade) values (?,?,?,?)',
        [cliente.nome, cliente.fone, cliente.email, cliente.cidade],
        (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            } else {
                callback(null, cliente)
            }
        }
    )
}


function listar(callback) {
    MYSQL.query('select * from clientes', [], callback)
}
function obter(codigo, callback) {
    MYSQL.query('select * from clientes where id=?', [codigo], (err, data) => {
        if(err) return callback(err)
        callback(null, data[0])
    })
}


function editar(cliente, callback) {
    MYSQL.query(
        'update clientes set nome=?, fone=?, email=?, cidade=? where id=?', 
        [cliente.nome,  cliente.fone, cliente.email, cliente.cidade, cliente.id], (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            }
            if(!data.affectedRows) {
                err = { notFound:true }
                return callback(err)
            }
            callback(null, cliente)
        })
}



function excluir(codigo, callback) {
    MYSQL.query('delete from clientes where id=?', [codigo], (err, data) => {
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

module.exports = {inserir, listar, obter, editar, excluir}