
exports.get = (req, res, next) => {
    global.db.findAll((e, docs) => {
        if(e) { 
            res.status(500).json({ error: e.message });
            res.end();
            return console.log(e); 
        }
        res.status(201).send(res.json(docs));
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
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};