const server = require('./server')
const print = require('./print')

server((req, res) => {
    var file = print.getFile()
    res.end(file)
})
