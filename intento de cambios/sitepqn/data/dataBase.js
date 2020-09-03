const fs = require('fs');
const path = require('path');//modulo que optimiza los accesos a los archivos para los diferentes sistemas operativos

//leo y parseo el json
module.exports= JSON.parse(fs.readFileSync(path.join(__dirname,'./dbProducts.json'), 'utf-8'))