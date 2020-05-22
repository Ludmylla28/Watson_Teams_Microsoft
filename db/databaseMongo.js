/**
 * Esse documento é responsavel pela conexão  com o banco de dados MongoDB.
 * Nessa aplicação usamos o novo serviço da IBM que é o "Databases for MongoDB"
 * 
 */
'use strict';

const MongoClient = require("mongodb").MongoClient;
var cfenv = require("cfenv");

var appEnv = cfenv.getAppEnv();

//Dentro do ambiente de aplicação (appenv) ha um objeto de servicos.
let services = appEnv.services;

//O objeto services e um mapa nomeado por servico, então nos extraimos o do MongoDB.
let mongodb_services = services["Databases for MongoDB"];

// Database Name
let dbName = "/*Nome da sua colection*/";




var db = {};

function connect(dados, collection){

    if (dados._id) delete dados._id;
    var connectionString = process.env.Connectionstring;
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: true,
        sslCA: Buffer.from(`${process.env.Credential}`, 'base64').toString('utf-8')
    };

    //conexão com o MongoDB
    try {
        MongoClient.connect(connectionString, options, function (err, client) {
            if (err) {
               console.log("Erro ao conectar ao compose mongodb : " + err); 
            } else {
            // lists the databases that exist in the deployment
                client.db(dbName)
                   .collection(collection)
                    .insertOne(dados, (err, result)=>{
                        if(err) console.log(JSON.stringify(dados), err);
                        
                        client.close();
                    })
                    console.log("Connected correctly to server");
            }
        });
    } catch (err) {
        console.log("Erro ao conectar ao compose mongodb : " + err);
    }
}

/**
 * Gravar logs da conversa.
 * 
 * @param {*} dados 
 */
db.gravarLogs = dados => connect(dados, "logs_application");

/**
 * Gravar historico da conversa.
 * 
 * @param {*} dados 
 */
db.gravarFeed = dados => connect(dados, "historico_conversation");

module.exports = db;