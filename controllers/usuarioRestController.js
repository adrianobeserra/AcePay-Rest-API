
exports.get = (req, res, next) => {
    global.db.findAll((e, docs) => {
        if(e) { 
            res.status(500).json({ error: e.message });
            res.end();
            return console.log(e); 
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(docs);
    });
};

exports.post = (req, res, next) => { 
    var novoUsuario = req.body;
    global.db.insert(novoUsuario, function(err, rows) {
        if (rows) {
            res.send({
              res: "Usuário cadastrado com sucesso.", novoUsuario
            })
          } else {
              if (err) { 
                  console.log(err);
              } else {
                res.send({
                    res: "Erro ao cadastrar o usuario.", err
                })
            }
        }
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    let usuario = req.body;
    global.db.update(id, usuario, function(err, rows) {
        if (rows) {
            res.send({
              res: "Usuário atualizado com sucesso.", usuario
            })
          } else {
              if (err) { 
                  console.log(err);
              } else {
                res.send({
                    res: "Erro ao atualizar o usuario.", err
                })
            }
        }
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    global.db.deleteUser(id, function(err, rows) {
        if (rows) {
            res.send({
              res: "Usuário excluído com sucesso.", id
            })
          } else {
              if (err) { 
                  console.log(err);
              } else {
                res.send({
                    res: "Erro ao excluir o usuario: ${id}", err
                })
            }
        }
    });
};