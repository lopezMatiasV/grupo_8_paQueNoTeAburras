const fs = require('fs');
const path = require('path');

//leo y parseo el json
module.exports= JSON.parse(fs.readFileSync(path.join(__dirname,'./dbProducts.json'), 'utf-8'))