const http = require('http')

module.exports = (callback) => {
    http.createServer(callback).listen(3000)
}