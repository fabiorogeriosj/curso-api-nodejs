
function inserir(produto, callback) {
    MYSQL.query(
        'insert into produtos (nome,foto,preco) values (?,?,?)',
        [produto.nome, produto.foto, produto.preco],
        (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            } else {
                callback(null, produto)
            }
        }
    )
}


function listar(callback) {
    MYSQL.query('select * from produtos', [], callback)
}
function obter(codigo, callback) {
    MYSQL.query('select * from produtos where id=?', [codigo], (err, data) => {
        if(err) return callback(err)
        callback(null, data[0])
    })
}


function editar(produto, callback) {
    MYSQL.query(
        'update produtos set nome=?, foto=?, preco=? where id=?', 
        [produto.nome,  produto.foto, produto.preco, produto.id], (err, data) => {
            if(err) {
                console.log(err)
                return callback(err)
            }
            if(!data.affectedRows) {
                err = { notFound:true }
                return callback(err)
            }
            callback(null, produto)
        })
}



function excluir(codigo, callback) {
    MYSQL.query('delete from produtos where id=?', [codigo], (err, data) => {
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