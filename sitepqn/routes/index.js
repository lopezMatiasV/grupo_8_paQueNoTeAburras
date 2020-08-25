var express = require('express');
var router = express.Router();
//requiero el controller
let controller = require('../controllers/mainController')

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
