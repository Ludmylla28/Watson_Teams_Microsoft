// Importe os serviços de bot necessários.
var db = require('./db/padraodados.js');
const dotenv = require('dotenv');
const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
var propertiesReader = require('properties-reader');
const properties = propertiesReader('./menssagens.prop')
const { EchoBot } = require('./conexoes/bot'); // Caixa de diálogo principal deste bot.
const ENV_FILE = path.join(__dirname, '.env');// Importe a configuração bot necessária.
dotenv.config({ path: ENV_FILE });

// Criar servidor HTTP
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${ server.name } ${properties.path().start.msg.init} ${ server.url }`);
});

// Crie um adaptador.
// Consulte https://aka.ms/about-bot-adapter para saber mais sobre como os bots funcionam.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all para erros.
const onTurnErrorHandler = async (context, error) => {
    // Essa verificação grava erros no console do console .vs. idéias de aplicativos.
     // NOTA: no ambiente de produção, considere registrar isso no Azure
     // informações do aplicativo.
    console.error(`\n Erro não tratado [onTurnError]: ${ error }`);
    db.getErro(error)
    

    // Envia uma atividade de rastreamento, que será exibida no Bot Framework Emulator
    await context.sendTraceActivity(
        'Rastreio OnTurnError',
        `${ error }`,
    );

// Envia uma mensagem para o usuário
    await context.sendActivity(`${properties.path().erro.msg.erroTeams}`);
    await context.sendActivity(`${ error }`)
};

// Defina o onTurnError para o singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Crie a caixa de diálogo principal.
const myBot = new EchoBot();

// Ouça as solicitações recebidas.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Rota para a caixa de diálogo principal.
        await myBot.run(context);
    });
});

// Escute as solicitações de atualização para streaming.
server.on('upgrade', (req, socket, head) => {
    // Crie um adaptador com escopo para esta conexão WebSocket para permitir o armazenamento de dados da sessão.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Configure onTurnError para o BotFrameworkAdapter criado para cada conexão.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
        // Após conectar-se via WebSocket, execute essa lógica para cada solicitação enviada
        // A conexão WebSocket.
        await myBot.run(context);
    });
});
