const mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit: 100,
    host     : 'apppedidos.chlibe6ny0si.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin123',
    database : 'dbpedidos'
})

function listar(callback) {
    pool.query('select * from ticket', callback)
}

function inserir(ticket, callback) {
    pool.query(
        'insert into ticket (nome, email) values (?, ?)',
        [ticket.nome, ticket.email],
        callback
    )
}

module.exports = { listar, inserir }
