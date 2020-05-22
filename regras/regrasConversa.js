/**
 * Este documento é importante para centralizar as regras de negocio. 
 * Essas regras mudam de acordo com as suas necessidades.
 */
const regra = {};
var dialog = require('../conexoes/conversation.js');

regra.watson = async function (waConversa){

    var regra = waConversa;

    /**
     *Este if reenvia o input do Usuario para o watson caso seja necessario.
     *Lembando que a variavel "input_jump" deve ser colocada no Watson Assistant.
     */ 
    if (waConversa.context.hasOwnProperty('input_jump')) {

        payload.input.text = waConversa.context.input_jump
        payload.context = waConversa.context
        delete payload.context.input_jump

        regra = await dialog.sendConversation(payload);
    }

    return regra;
};



module.exports = regra;