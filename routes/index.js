var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

const usuarioController = require('../controllers/usuarioController');
var jsonParser = bodyParser.json();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('teste');
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Documentos', docs: docs });
  })
})


/* Rota para a View de Cadastro */
router.get('/new',function(req, res, next) {
  res.render('new', { title: 'Novo Documento' });
});

/* Rota para a Cadastro de Usuário */
router.post('/new', function(req, res, next) {
  usuarioController.post(req, res, next);
  //res.render('new', { title: 'Novo Cadastro' });
});

/* Rota para a View de Update */
router.get('/update/:id', function(req, res, next) {
  usuarioController.findOne(req, res, next);
});

/* Rota para Update */
router.post('/update/:id', function(req, res, next) {
  usuarioController.put(req, res, next);
});

/* Rota para Delete */
router.get('/delete/:id', function(req, res, next) {
  usuarioController.delete(req, res, next);
});



module.exports = router;
