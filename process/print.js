const path = require('path')
const cp = require('child_process')

module.exports.getPrint = () => {
    var filename = null

    if(process.platform === 'linux') {
		cp.execSync('scrot -b print.png', { cwd: __dirname })	
		filename = path.join(__dirname, 'print.png')
	} else {
		const path_nircmd = path.join(__dirname, 'nircmd')
		cp.execSync('nircmd savescreenshot print.png', { cwd: path_nircmd})	
		filename = path.join(path_nircmd, 'print.png')
    }
    
    return filename
}
