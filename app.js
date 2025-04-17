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

//EndPoint para buscar jogos
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
        let idJogo = request.params.id
    
        let resultJogo = await controllerJogo.buscarJogo(idJogo)
    
        response.status(resultJogo.status_code)
        response.json(resultJogo)
    })

app.delete('/v1/controle-jogos/jogo/delete/:id', cors(), async function (request, response) {
        let id = request.params.id 
      
        let resultJogo = await controllerJogo.excluirJogo(id)
      
        response.status(resultJogo.status_code)
        response.json(resultJogo)
      })
      
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content-type da requisição
        let contentType = request.headers['content-type']
        //Recebe o id do jogo 
        let idJogo = request.params.id 

        //Recebe os dados do jogo encaminhando no body da requisição
        let dadosBody = request.body

        let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

        response.status(resultJogo.status_code)
        response.json(resultJogo)

        
})      

/**************************************************************************/

const controllerGenero = require('./controller/genero/controllerGenero.js')

//Inserir
app.post('/v1/controle-generos/genero', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
    
        let dadosBody = request.body
    
        let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
    })
    

//Listar
app.get('/v1/controle-generos/genero', cors(), async function (request, response) {
        let resultGenero = await controllerGenero.listarGenero()
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
    })
          
//Buscar
app.get('/v1/controle-generos/genero/:id', cors(), async function (request, response) {
        let idGenero = request.params.id
    
        let resultGenero = await controllerGenero.buscarGenero(idGenero)
    
        response.status(resultGenero.status_code)
        response.json(resultGenero)
    })

//Delete
app.delete('/v1/controle-generos/genero/delete/:id', cors(), async function (request, response) {
        let id = request.params.id 
      
        let resultGenero = await controllerGenero.excluirGenero(id)
      
        response.status(resultGenero.status_code)
        response.json(resultGenero)
      })

//Atualizar
app.put('/v1/controle-generos/genero/:id', cors(), bodyParserJSON, async function(request, response){

        //Recebe o content-type da requisição
        let contentType = request.headers['content-type']
        //Recebe o id do jogo 
        let idGenero = request.params.id 

        //Recebe os dados do jogo encaminhando no body da requisição
        let dadosBody = request.body

        let resultGenero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

        response.status(resultGenero.status_code)
        response.json(resultGenero)
})      

/**************************************************************************/

const controllerSexo = require('./controller/sexo/controllerSexo.js')

//Inserir
app.post('/v1/controle-sexos/sexo', cors(), bodyParserJSON, async function(request, response){

        let contentType = request.headers['content-type']
    
        let dadosBody = request.body
    
        let resultSexo = await controllerSexo.inserirSexo(dadosBody, contentType)
    
        response.status(resultSexo.status_code)
        response.json(resultSexo)
    })

//Listar
app.get('/v1/controle-sexos/sexo', cors(), async function (request, response) {
        let resultSexo = await controllerSexo.listarSexo()
    
        response.status(resultSexo.status_code)
        response.json(resultSexo)
    })

//Buscar
app.get('/v1/controle-sexos/sexo/:id', cors(), async function (request, response) {
        let idSexo = request.params.id
    
        let resultSexo = await controllerSexo.buscarSexo(idSexo)
    
        response.status(resultSexo.status_code)
        response.json(resultSexo)
    })

/**************************************************************************/

app.listen(8080, function(){
        console.log('API aguardando requisições...')
})

