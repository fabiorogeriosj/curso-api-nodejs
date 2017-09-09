const http = require('http')
const porta = 3000


const tickets = []

tickets.push({ 
    codigo: 123,
    nome: "Fàbio ROgério SJ", 
    email: "fabio.rogerio.sj@gmail.com"
})

http.createServer(listenerWebServer).listen(porta)
console.log(`WebServer rodando na porta ${porta} (Ctrl+C)`)

function listenerWebServer(req, res){
    
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' })

    var post = function(index){
        var body = []
        return req.on('data', (data) => {
            body.push(data)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            var ticket = JSON.parse(body)
            ticket.codigo = new Date().getTime()
            if(index < 0 || index == null){
                tickets.push(ticket)
            } else {
                tickets[index].nome = ticket.nome
                tickets[index].email = ticket.email
            }
            return res.end( JSON.stringify(ticket) )
        })
    }
    
    if(req.method === "GET" && req.url === "/") {
        return res.end('{ "message": "API REST!" }')
    }

    if(req.method === "GET" && req.url.indexOf("/tickets") >= 0) {
        var split = req.url.split("/");
        if(split.length === 2) {
            return res.end( JSON.stringify(tickets) )
        }        
        if(split.length === 3){
            var codigo = split[2]
            var ticket = {}
            for(i in tickets) {
                if(tickets[i].codigo == codigo) {
                    ticket = tickets[i]
                }
            }
            return res.end( JSON.stringify(ticket) )
        }
    }

    if(req.method === "DELETE" && req.url.indexOf("/tickets") >= 0) {
        var split = req.url.split("/");
        if(split.length === 2) {
            return res.end('{}')
        }        
        if(split.length === 3){
            var codigo = split[2]
            var index = -1
            for(i in tickets) {
                if(tickets[i].codigo == codigo) {
                    index = i
                }
            }
            if(index < 0) {
                res.writeHead(404)
                return res.end('Não encontrado!')
            }
            tickets.splice(index, 1)
            return res.end( JSON.stringify(tickets) )
        }
    }

    if(req.method === "PUT" && req.url.indexOf("/tickets") >= 0) {

        
        var split = req.url.split("/");
        if(split.length === 2) {
            return post()
        }        
        if(split.length === 3){
            var codigo = split[2]
            var index = -1
            for(i in tickets) {
                if(tickets[i].codigo == codigo) {
                    index = i
                }
            }
            return post(index)
        }
    }

    if(req.method === "POST" && req.url === "/tickets") {
        return post()
    }

    res.writeHead(404)
    res.end('Não encontrado!')

}
