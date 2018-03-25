var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://adrianobeserra:D1b2s3@ds123619.mlab.com:23619/acepaydb")
            .then(conn => global.conn = conn.db("acepaydb"))
            .catch(err => console.log(err))
 
            function findAll(callback){  
                global.conn.collection("usuario").find({}).toArray(callback);
            }
            
module.exports = { findAll }
