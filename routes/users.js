var express = require('express');
var router = express.Router();

const usuarioRestController = require('../controllers/usuarioRestController');

/* GET users listing. */
router.get('/', usuarioRestController.get);

/* POST user */
router.post('/',usuarioRestController.post);

/* PUT user */
router.put('/:id',usuarioRestController.put);

/* DELETE user */
router.delete('/:id',usuarioRestController.delete);

module.exports = router;
