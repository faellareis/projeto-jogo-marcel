/**************************************************************************
* Objetivo: API referente ao projeto controle de jogos
* Data: 13/02/2025
* Autor: Rafa 
* Versão: 1.0
* Observação: 
********* Para configurar e instalar a API, precisamos das seguintes bibliotecas:
*                express                 npm install express             --save 
*                cors                    npm install cors                --save
*                body-parser             npm install body-parser         --save
********* Para configurar e instalar o acesso ao Banco de Dados precisamos:
*                prisma                  npm install prisma              --save  (conexão com o BD)
*                @prisma/client          npm install @prisma/client      --save  (executa scripts no BD)
*
**** Após a instalação do prisma e do prisma client, devemos:
        * npx prisma init  (Inicializar o prisma no projeto)
 
********* Para realizar o sincronismo do prisma com o BD, devemos executar o segunte comando:
        * npx prisma migrate dev
***************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import das controlles para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo formatos de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())
        next()
})

//EndPoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do Body da requisição para a controller inserir no BD
        let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})
//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {
        //Chama a função para listar os jogos 
        let resultJogo = await controllerJogo.listarJogo()

        response.status(resultJogo.status_code)
        response.json(resultJogo)
})

app.listen(8080, function(){
        console.log('API aguardando requisições...')
})

