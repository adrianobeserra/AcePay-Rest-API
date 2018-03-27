var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://adrianobeserra:D1b2s3@ds123619.mlab.com:23619/acepaydb")
            .then(conn => global.conn = conn.db("acepaydb"))
            .catch(err => console.log(err))
 
const collection = "usuario";

            function findAll(callback){  
                global.conn.collection(collection).find({}).toArray(callback);
            }

            function insert(doc, callback) {
                global.conn.collection(collection).insertOne(doc, callback);
            }

            function update(_id, doc, callback) {
                let id = _id;
                global.conn.collection(collection).replaceOne(
                    { "_id": "${id}" },
                    doc, { upsert: false }, callback);
            }

            function deleteUser(_id, callback) {
                let id = _id;
                global.conn.collection(collection).deleteOne(
                    { "_id": id }, callback);
            }
            
module.exports = { findAll, insert, update, deleteUser }
