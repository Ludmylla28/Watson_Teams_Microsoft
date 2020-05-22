require('dotenv').config({ silent: true });
var watson = require('watson-developer-cloud'); // watson sdk
var propertiesReader = require('properties-reader');
var properties = propertiesReader('./menssagens.prop')
var db = require('../db/padraodados.js');
var regra = require('../regras/regrasConversa.js');

var dialog = {};

var conversation = new watson.AssistantV1({
    iam_apikey: process.env.WATSON_API_KEY,
    url: process.env.WATSON_API_URL,
    version: '2018-02-16',
    strictSSL: false,
    rejectUnauthorized: false
});

/**
 * Chamada para a API do Watson Conversation.
 * 
 * @param {*} origen_solicitacao 
 * @param {*} payload 
 */
dialog.sendConversation = async function (payload) {
    return new Promise(async function (resolve, reject) {
        conversation.message(payload, async function (err, waConversa) {
            if (waConversa) {
                if (waConversa.output.text.length != 0 && waConversa.output.text != "") {

                    await regra.watson(waConversa)
                        .then(retorno => {
                            resolve(retorno);
                        });
                }
            } else {
                var retorno = {
                    output: {
                        text: []
                    },
                    context: null
                };
                db.getErro(err)
                retorno.output.text.push(`${properties.path().erro.msg.erroWatson}`);
                reject(retorno);
            }
        });
    });
}

module.exports = dialog;