const http = require('http')
const fs = require('fs')

const print = require('./print')

const server = http.createServer((req, res) => {
	var filename = print.getPrint()
	const stat = fs.statSync(filename)
	const file = fs.readFileSync(filename)

	const headerOptions = {
		'Content-Type': 'image/png',
		'Content-Length': stat.size
	}

	res.writeHead(200, headerOptions)

	res.end(file)
})

server.listen(3000)

