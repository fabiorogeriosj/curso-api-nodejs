


const mysql = require('mysql')

global.TRATAR_ERRO = function(res, status, msg){
    res.writeHead(status)
    res.end(msg)
}

global.MYSQL = mysql.createPool({
    connectionLimit: 100,
    host     : 'apipedidos.chlibe6ny0si.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'admin123',
    database : 'cafepedido'
})

global.mongoose = require('mongoose')

mongoose.connect('mongodb://admin:admin@ds157624.mlab.com:57624/apipedidos')

var db = mongoose.connection

db.on('error', (error) => {
    throw new Error(error)
})

db.once('open', ()=> console.log('MongoDB conectado!'))


var limiteSchema = mongoose.Schema({
    token: String,
    ultima_consulta: String
})

global.limiteModel = mongoose.model('limiteAcesso', limiteSchema)