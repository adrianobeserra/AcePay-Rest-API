
exports.get = (req, res, next) => {
    global.db.findAll((e, docs) => {
        if (e) {
            res.status(500).json({ error: e.message });
            res.end();
            return console.log(e);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify(docs));
    });
}

exports.findOne = (req, res, next) => {
    let id = req.params.id;
    if (id) {
        global.db.findOne(id, function (e, docs) {
            if (e) {
                res.status(500).json({ error: e.message });
                res.end();
                return console.log(e);
            }
            console.log(docs);
            res.render('update', { title: 'Atualizar Documento', doc: docs[0] });
        });
    }
};



exports.post = (req, res, next) => {
    let novoUsuario = req.body;
    let usuarioJSON = JSON.stringify(novoUsuario, function (k, v) {
        if (v == '' || v == null) {
            return undefined;
        }
        return v;
    });
    novoUsuario = JSON.parse(usuarioJSON);
    global.db.insert(novoUsuario, function (err, rows) {
        if (rows) {
            res.send({
                "res": "Usuário cadastrado com sucesso.", novoUsuario
            })
        } else {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    "res": "Erro ao cadastrar o usuario.", err
                })
            }
        }
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    let novoUsuario = req.body;
    let usuarioJSON = JSON.stringify(novoUsuario, function (k, v) {
        if (v == '' || v == null) {
            return undefined;
        }
        return v;
    });
    novoUsuario = JSON.parse(usuarioJSON);
    if (id) {
        global.db.update(id, novoUsuario, function (err, rows) {
            if (rows) {
                res.send({
                    "res": "Usuário atualizado com sucesso.", novoUsuario
                })
            } else {
                if (err) {
                    console.log(err);
                } else {
                    res.send({
                        "res": "Erro ao atualizar o usuario.", err
                    })
                }
            }
        });
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    global.db.deleteUser(id, function (err, rows) {
        if (rows) {
            console.log('sucesso:' + rows);
            res.redirect('/');
        } else {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    "res": "Erro ao excluir o usuario: ${id}", err
                })
            }
        }
    });
};