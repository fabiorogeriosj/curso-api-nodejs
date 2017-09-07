
const http = require('http')

var tickets = [
    {codigo:123, titulo: "Duvidas x", "descricao": "Lorem ipsum dolores x"},
    {codigo:234, titulo: "Duvidas y", "descricao": "Lorem ipsum dolores y"}
]

http.createServer(function(req,res) {
    
    if(req.method === "GET" && req.url === "/") {
        return recursoIndex(req, res)
    }

    if(req.method === "GET" && req.url === "/tickets") {
        return recursoTickets(req, res)
    }

    if(req.method === "POST" && req.url === "/tickets") {
        return recursoTicketsNovo(req, res)
    }

    res.writeHead(404)
    res.end("Recurso não encontrado!")


}).listen(3000)

function recursoIndex(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end('{"nome": "Fábio","email": "fabio.rogrio.sj@gmail.com"}')
}

function recursoTickets(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end( JSON.stringify(tickets) )
}

function recursoTicketsNovo(req, res) {
    var body = []
    req.on('data', function(data){
        body.push(data)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        var ticket = JSON.parse(body)
        ticket.codigo = new Date().getTime()
        tickets.push(ticket)
        
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
        return res.end( JSON.stringify(ticket) )
    })
}

console.log("Servidor HTTP rodando na porta 3000")



