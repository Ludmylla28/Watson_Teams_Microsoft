const { ActivityHandler, MessageFactory } = require('botbuilder');
var dialog = require('./conversation.js');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('./menssagens.prop')
var db = require('../db/padraodados.js');
var regra = require('../regras/regrasConversa.js');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        var contextWatson = {}
        var payload = {}

        // Consulte https://aka.ms/about-bot-activity-message para saber mais sobre a mensagem e outros tipos de atividades.
        this.onMessage(async (context, next) => {

            var input = String(context.activity.text)
            var input = input.replace(/\s{2,}/g, '');
            
            var payload = {
                workspace_id: process.env.WORKSPACE_ROTEADOR,
                context: contextWatson.context || { bot_test: true},
                input: { text: input }
            };

            var output = {}


            await dialog.sendConversation(payload)
                .then(retorno => {
                    output = retorno.output.text
                    contextWatson = retorno
                    console.log(contextWatson)
                }).catch(errs => {
                    db.getErro(errs)
                    return (errs);
                });

            if (output) {
                //Salvando a conversa
                db.getHistorico(contextWatson)

                //enviando a conversa para o usuario.
                for (var i in output) {
                    var text = output[i]
                    await context.sendActivity(MessageFactory.text(text, text));
                    // Ao chamar next (), você garante que o próximo BotHandler seja executado.
                    await next();
                }
            }
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = `${properties.path().conversa.msg.inicial}`;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // Ao chamar next (), você garante que o próximo BotHandler seja executado.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
