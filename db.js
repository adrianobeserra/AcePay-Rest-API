var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://adrianobeserra:D1b2s3@ds123619.mlab.com:23619/acepaydb")
    .then(conn => global.conn = conn.db("acepaydb"))
    .catch(err => console.log(err))
var ObjectId = require('mongodb').ObjectID;

const collection = "usuario";

function findAll(callback) {
    //1 - Buscar todos os documentos
    global.conn.collection(collection).find({}).toArray(callback);
}

function findOne(id, callback) {
    //2 - Buscar documento por ID
    global.conn.collection(collection).find(new ObjectId(id)).toArray(callback);
}

function insert(doc, callback) {
    global.conn.collection(collection).insertOne(doc, callback);
}

function update(_id, doc, callback) {
    let id = _id;
    global.conn.collection(collection).update(
        { "_id": new ObjectId(id) },
        doc, { upsert: false }, callback);
}

function deleteUser(_id, callback) {
    let id = _id;
    global.conn.collection(collection).deleteOne(
        { "_id": new ObjectId(id) }, callback);
}

function executeQuery(_numeroConsulta, callback) {
    let numeroConsulta = _numeroConsulta;
    let queryMongo = global.conn.collection("usuario");
    switch (numeroConsulta) {
        //1 - Buscar todos os documentos
        case '1': queryMongo.find({}).toArray(callback); break;
        //2 - Buscar documento por ID
        case '2': queryMongo.find(new ObjectId("5ab70b50734d1d57bac4d706")).toArray(callback); break;
        //3 - Buscar todos os documentos sem transacao associada
        case '3': queryMongo.find({ "transacoes": { $exists: true, $ne: "", $ne: null, $ne: {} } }).toArray(callback);
            break;
        //4 - Buscar todos os documentos com transacao associada
        case '4': queryMongo.find(
            {
                $or: [
                    { "transacoes": { $exists: false } },
                    { "transacoes": { $eq: "" } },
                    { "transacoes": { $eq: null } },
                    { "transacoes": { $eq: {} } }
                ]
            }).toArray(callback);
            break;
        //5 - Buscar transacoes de todos os documentos com transacao associada, agrupados por CPF
        case '5': queryMongo.aggregate([
            {
                "$match": {
                    "transacoes": {
                        $exists: true,
                        $ne: "",
                        $ne: null,
                        $ne: {}
                    }
                }
            },
            {
                "$group": {
                    _id: "$cpf",
                    "transacoes": {
                        "$push": "$transacoes"
                    }
                }
            }
        ]).toArray(callback);
            break;
        //6 - Buscar todos os documentos com transacao associada com data de transacao nos ultimos 6 meses, agrupados por CPF
        case '6': queryMongo.aggregate([
            {
                "$match": {
                    "transacoes": {
                        $exists: true,
                        $ne: "",
                        $ne: null,
                        $ne: {},
                    },
                    "transacoes.data": {
                        $lt: new Date(),
                        $gte: new Date(new Date().getTime() - (1 * 24 * 60 * 60000 * 180))
                    }
                }
            },
            {
                "$group": {
                    _id: "$cpf",
                    "transacoes": {
                        "$push": "$transacoes"
                    }
                }
            }
        ]).toArray(callback);
            break;
        //7 - Buscar todos os documentos com transacao associada com data de transacao nos ultimo ano, agrupados por CPF
        case '7': queryMongo.aggregate([
            {
                "$match": {
                    "transacoes": {
                        $exists: true,
                        $ne: "",
                        $ne: null,
                        $ne: {},
                    },
                    "transacoes.data": {
                        $lt: new Date(),
                        $gte: new Date(new Date().getTime() - (1 * 24 * 60 * 60000 * 365))
                    }
                }
            },
            {
                "$group": {
                    _id: "$cpf",
                    "transacoes": {
                        "$push": "$transacoes"
                    }
                }
            }
        ]).toArray(callback);
            break;
        //8 - Buscar documentos cadastradados na ultima semana
        case '8': queryMongo.find(
            {
                "data_cadastro": {
                    $lt: new Date(),
                    $gte: new Date(new Date().getTime() - (1 * 24 * 60 * 60000 * 7))
                }

            }
        ).toArray(callback);
            break;
        //9 - Buscar documentos cadastradados na dia atual
        case '9': queryMongo.find(
            {
                "data_cadastro": {
                    $lt: new Date(),
                    $gte: new Date(new Date().getTime() - (24 * 60 * 60000))
                }

            }
        ).toArray(callback);
            break;
        //10 - Buscar documentos cadastradados nos ultimos 6 meses
        case '10': queryMongo.find(
            {
                "data_cadastro": {
                    $lt: new Date(),
                    $gte: new Date(new Date().getTime() - (24 * 60 * 60000) * (6 * 30))
                }

            }
        ).toArray(callback);
            break;
        //11 - Buscar documentos cadastradados nos no mes atual (de qualquer ano)
        case '11': queryMongo.aggregate([
            {
                $project: {
                    "document": "$$ROOT",
                    month: false, month: { $month: '$data_cadastro' }
                }
            },
            {
                "$match":
                    {
                        "document.data_cadastro": { $exists: true },
                        "month": { $eq: new Date().getMonth() + 1 }
                    }
            }
        ]).toArray(callback);
            break;
        //12 - Buscar documentos cadastradados nos no dia atual (de qualquer mes)
        case '12': queryMongo.aggregate([
            {
                $project: {
                    "document": "$$ROOT",
                    "dia_do_mes": { $dayOfMonth: '$data_cadastro' }
                }
            },
            {
                "$match":
                    {
                        "document.data_cadastro": { $exists: true },
                        "dia_do_mes": { $eq: new Date().getDate() }

                    }
            }
        ]).toArray(callback);
            break;
        //13 - Buscar documentos cadastradados nos no dia e mes atual (de qualquer ano)
        case '13': queryMongo.aggregate([
            {
                $project: {
                    "document": "$$ROOT",
                    "dia_do_mes": { $dayOfMonth: '$data_cadastro' },
                    "mes_do_ano": { $month: '$data_cadastro' }
                }
            },
            {
                "$match":
                    {
                        "document.data_cadastro": { $exists: true },
                        "dia_do_mes": { $eq: new Date().getDate() },
                        "mes_do_ano": { $eq: new Date().getMonth() + 1 }
                    }
            }
        ]);
            break;
        //14 - Buscar documentos cadastradados nos no dia atual (de qualquer mes)
        case '14':
            break;
        //15 - Buscar documentos que completam 1 ano de cadastro no mês atual
        case '15': queryMongo.aggregate([
            {
                $project: {
                    "document": "$$ROOT",
                    "dia": { $dayOfMonth: '$data_cadastro' },
                    "mes": { $month: '$data_cadastro' },
                    "ano": { $year: '$data_cadastro' }
                }
            },
            {
                "$match":
                    {
                        "document.data_cadastro": { $exists: true },
                        "mes": { $eq: new Date().getMonth() + 1 },
                        "ano": { $eq: new Date().getFullYear() - 1 }
                    }
            }
        ]).toArray(callback);
            break;
        //16 - Buscar documentos de pessoas nascidas na última década
        case '16': queryMongo.find(
            {
                "data_nasc": {
                    $lt: new Date(),
                    $gte: new Date(new Date().getTime() - (24 * 60 * 60000) * (365 * 10))
                }

            }
        ).toArray(callback);
            break;
        //17 - Buscar documentos de pessoas maiores de 18 anos
        case '17': queryMongo.find(
            {
                "data_nasc": {
                    $lte: new Date(new Date().setYear(new Date().getFullYear() - 18))
                }
            }).toArray(callback);
            break;
        //18 - Buscar documentos de pessoas menores de 18 anos
        case '18': queryMongo.find(
            {
                "data_nasc": {
                    $gte: new Date(new Date().setYear(new Date().getFullYear() - 18))
                }
            }).toArray(callback);
            break;
        //19 - Buscar documentos de pessoas que fazem aniversário no mês atual
        case '19': queryMongo.aggregate([
            {
                $project: {
                    "document": "$$ROOT",
                    "mes": { $month: '$data_nasc' }
                },
            },
            {
                "$match":
                    {
                        "document.data_nasc": { $exists: true },
                        "mes": { $eq: new Date().getMonth() + 1 },

                    }
            }
        ]).toArray(callback);
        break;
        //20 - Buscar documentos cujo endereço do usuário é da cidade do Recife
        //21 - Buscar documentos cujo endereço do usuário é do estado de Pernambuco
        //22 - Buscar documentos nos quais a conta bancária é corrente
        //23 - Buscar documentos nos quais a conta bancária é poupança
        //24 - Buscar documentos nos quais o saldo a receber da conta bancária maior que 0
        //25 - Buscar documentos nos quais o saldo a receber da conta bancária igual a 0
        //26 - Buscar documentos nos quais o saldo da BitCoin igual a 0
        //27 - Buscar documentos nos quais o saldo de BitCoin igual a 0,005
        //28 - Buscar documentos nos quais o saldo de BitCoin é igual a 0,002
        //29 - Buscar documentos nos quais o saldo de BitCoin está entre 0 e 1
        //30 - Buscar documentos agrupados por Cidade do endereço e saldo de BitCoin
        //31 - Buscar documentos nos quais o saldo de BitCoin da conta a acePay é maior ou igual a 1
        //32 - Buscar a soma dos saldos das das contas cujos endereços sao de Recife
        //33 - Buscar a soma dos saldos das das contas cujos endereços sao do Estado de Pernambuco
        default: console.log("default");
    }
}

module.exports = { findAll, findOne, insert, update, deleteUser, executeQuery }
