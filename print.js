const path = require('path')
const cp = require('child_process')
const fs = require('fs')

function getFilename () {
    var filename = path.join(__dirname, 'print.png')
    if(process.platform === 'darwin') {
        cp.execSync('screencapture print.jpg', { cwd: __dirname })
        filename = path.join(__dirname, 'print.jpg')
    } else if(process.platform === 'linux') {
        cp.execSync('scrot print.png', { cwd: __dirname })
    } else if(process.platform === 'win32') {
        cp.execSync('nircmd.exe savescreenshot print.png', { cwd: __dirname })
    } 
    return filename
}

function getFile () {
    var filename = getFilename()
    const file = fs.readFileSync(filename)
    fs.unlink(filename)
    return file
}

module.exports = {
    getFile
}