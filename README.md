Seja bem vindo. 
Sou a [Ludmylla](https://www.linkedin.com/in/ludmylla-bianca-silva-0b941b100/) e desenvolvo de Assistentes Vistuais Inteligente.

#Conect o seu Watson Assistant da IBM com o Teams da Microsoft

#Obtenha o Codigo.
Clone este codigo usando o comando:
>git clone 

#Preencra os campos faltantes no codigo. 
Edite esses campos do codigo com o nome do seu bot: 
ARQUIVO: manifest.yml - linha 2
- name: (Nome do servidor)

ARQUIVO: db/databaseMongo.js - linha 20
let dbName = "/*Nome da sua colection*/";

Edite esses campos do codigo com as credenciais necessarias. 
ARQUIVO: .env
##Microsoft Bot Info
Já logado no Portal da Microsoft Azure. Crie o [serviço de bot](./imagens/servicoBot.png),
e lá encontrara as [credenciais da Microsoft](./imagens/credenciaisMicrosoft.png) 

**MicrosoftAppId**=(ID Microsoft)
**MicrosoftAppPassword**=(senha Microsoft)


##WorkSpaces IBM
Crie o serviço de [Assistant na IBM](https://cloud.ibm.com/catalog/services/watson-assistant?location=eu-gb)
Ao entrar no [assistant/skill](./imagens/ondeAchaIBM.png), 
você encontrará as [credenciais abaixo](./imagens/credenciaisIBM.png).

**WATSON_API_KEY**=(credencial do Watson Assistant)
**WORKSPACE_ROTEADOR**=(skill ID)

##URL Mongodb Services
Crie um serviço de [mongoDB](https://cloud.ibm.com/catalog/services/databases-for-mongodb)
e você achará as credenciais necessarioas na aba ["credenciais"](./imagens/credenciaisDB.png). 

**Connectionstring**= (String de conexão URI)
**Credential**=(Credencial codificada)


##Instalações
Instale o [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/blob/master/README.md),
o [Node.js](https://nodejs.org/pt-br/download/)

Intale os pacotes no programa. 
>npm install 

##Iniciando
Inicie o programa com o comando:
>npm start
Ou caso use o Visual Studio Code, é sou precionar o F5. 

Você vai colocar no [Bot Framework](./imagens/acessoBotFrame.png) essa URL e as mesmas credenciais da Microsoft colocadas no .env
>http://localhost:3978/api/messages

Agora é só testar. 