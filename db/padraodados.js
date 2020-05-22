/**
 * Neste arquivo nos centralizamos o padrão de salvar os dados. 
 * Isso tambem pode ser feito seguindo um SCHEMA de estruturação dos dados. 
 */

const adapter = {};
var data = require('../util/dataUtil');
var db = require('./databaseMongo.js');

/**
 * @param waConversa 
 * Esta funcão tem o padrão necessario para salvar as conversas. 
 * Cada mensagem enviada para o usuario é salva em um arquivo diferente. 
 */
adapter.getHistorico = async (waConversa) => {

    if (waConversa.context != null) {

        var date_system = await data.db();
        var schema = {};

        waConversa.context = Object.assign(waConversa.context, date_system);
        schema = Object.assign({}, waConversa.context);

        if (waConversa.output) {
            if (waConversa.output.text.length > 0) {
                var i = 0;
                waConversa.output.text.forEach(item => {
                    if (i == 0) {
                        schema.outputtext = item;
                    } else {
                        schema.outputtext += " | " + item;
                    }
                    i++;
                });
            }
        }

        schema.inputtext = waConversa.input.text;
        schema.intent = waConversa.intents;
        schema.entities = waConversa.entities;

        delete schema.system;
        db.gravarFeed(schema);
    }
}

/**
 * @param waConversa 
 * Esta funcão tem o padrão necessario para salvar os erros de servidor. 
 */
adapter.getErro = async (waConversa) => {

    var date_system = await data.db();
    var schema = {};

    schema = Object.assign({}, date_system);

    //O output.text não é gravado no banco de dados quando esta em branco. 
    if (waConversa.hasOwnProperty(output)) {
        
        if (waConversa.output.text.length > 0) {
            var i = 0;
            waConversa.output.text.forEach(item => {
                if (i == 0) {
                    schema.outputtext = item;
                } else {
                    schema.outputtext += " | " + item;
                }
                i++;
            });
        }

        schema.erro = waConversa.output.error;
    } else {
        schema.erro = waConversa
    }
    //Caso no erro tenha o input enviado pelo o usuario o mesmo sera salvo.
    if (waConversa.hasOwnProperty(input.text)) {
        schema.input = waConversa.input.text;
    }

    db.gravarLogs(schema);
}
module.exports = adapter;