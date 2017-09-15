const http = require('http')
const path = require('path')
const fs = require('fs')
const cp = require('child_process')

const server = http.createServer((req, res) => {

	const path_nircmd = path.join(__dirname, 'nircmd')
  	const print = cp.execSync('nircmd savescreenshot print.png', { cwd: path_nircmd})

  	console.log(process)

  	const filename = path.join(path_nircmd, 'print.png')
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
