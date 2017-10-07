const async = require('async')
const moment = require('moment')

function inserir(pedido, callback) {
    const ids = pedido.itens.map(item => item.id_produto).join(',')

    async.series([
        (done) => {
            MYSQL.query(`select id, preco from produtos where id in (${ids})`, (err, data) => {
                if(err) return done(err)
                // Método mais convencional
                // for(indexItem in pedido.itens) { ... }
                pedido.data = moment(pedido.data, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
                pedido.total = 0
                for(item of pedido.itens) {
                    var produto = data.filter((produto) => produto.id == item.id_produto )
                    if(produto.length) {
                        item.preco = produto[0].preco
                        item.total = item.preco * item.quantidade
                        pedido.total += item.total
                    }
                }
                done()
            })
        },
        (done) => {
            MYSQL.query(
                'insert into pedidos (id_cliente, id_usuario, data, total, status) values (?,?,?,?,?)',
                [pedido.id_cliente, pedido.id_usuario, pedido.data, pedido.total, 'ABERTO'],
                (err, data) => {
                    if(err) return done(err)
                    pedido.id = data.insertId
                    done()
                }
            )
        },
        (done) => {
            var sql = `insert into itens (id_pedido, id_produto, preco, quantidade, total) values `
            for(item of pedido.itens) {
                sql += `(${pedido.id}, ${item.id_produto},
                         ${item.preco}, ${item.quantidade}, ${item.total}),`
            }
            sql = sql.slice(0, -1)
            MYSQL.query(sql, (err, data) => {
                if(err) return done(err)
                done()
            })
        }
    ], (err, data) => {
        if(err) return callback(err)
        callback(null, pedido)
    })
}

function listar(callback) {
    var pedidos = []
    MYSQL.query(`select *, DATE_FORMAT(pedidos.data, '%d/%m/%Y %h:%i') as data from pedidos`, [], (err, data) => {
        if(err) return callback(err)
        callback(null, data)
    })
}

function obter(codigo, callback) {
    var pedidos = []
    MYSQL.query(
        `select 
        pedidos.id, pedidos.total, pedidos.id_cliente, pedidos.id_usuario, pedidos.data, pedidos.status,
        itens.id_produto, itens.preco, itens.quantidade,
        produtos.nome, produtos.foto
        from pedidos inner join itens on pedidos.id = itens.id_pedido 
        inner join produtos on itens.id_produto = produtos.id where pedidos.id = ?`, 
        [codigo], (err, data) => {
            for(item of data) {
                var indexPedido = pedidos.map((o) => o.id).indexOf(item.id)
                if(indexPedido >= 0) {
                    pedidos[indexPedido].itens.push({
                        id_produto: item.id_produto, 
                        quantidade: item.quantidade,
                        preco: item.preco,
                        total: item.total,
                        nome: item.nome,
                        foto: item.foto
                    })
                } else {
                    pedidos.push({
                        id: item.id,
                        data: item.data,
                        total: item.total,
                        status: item.status,
                        id_cliente: item.id_cliente,
                        id_usuario: item.id_usuario,
                        itens: [
                            { 
                                id_produto: item.id_produto, 
                                quantidade: item.quantidade,
                                preco: item.preco,
                                total: item.total,
                                nome: item.nome,
                                foto: item.foto
                            }
                        ]
                    })
                }
            }
            callback(null, pedidos[0])
        })
}

module.exports = { inserir, listar, obter }