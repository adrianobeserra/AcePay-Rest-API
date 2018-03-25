var express = require('express');
var router = express.Router();

const usuarioController = require('../controllers/usuarioController');

/* GET users listing. */
router.get('/', usuarioController.get);

/* POST user */
router.post('/',usuarioController.post);

/* PUT user */
router.put('/:id',usuarioController.put);

/* DELETE user */
router.delete('/:id',usuarioController.delete);

module.exports = router;
