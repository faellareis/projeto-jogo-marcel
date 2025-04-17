/*************************************************** 
* Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
* Data: 10/04/2025
* Autor: Rafa
* Versão: 1.0
****************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const generoDAO = require('../../model/DAO/genero.js')

//Função para inserir um novo jogo
const inserirGenero = async function(genero, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (genero.nome               == undefined   || genero.nome                 == ''   ||  genero.nome                == null     ||
         genero.descricao          == undefined   || genero.descricao            == ''   ||  genero.descricao           == null  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }else{
            //Encaminha os dados do novo jogo para ser inserido no BD
            let resultGenero = await generoDAO.inserirGenero(genero)

            if(resultGenero)
                return MESSAGE.SUCESS_CREATED_ITEM //201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um jogo
const atualizarGenero = async function(genero, id, contentType){
    try{

        if(contentType == 'application/json'){
            if
        (genero.nome               == undefined   || genero.nome                 == ''   ||  genero.nome                == null     ||
         genero.descricao          == undefined   || genero.descricao            == ''   ||  genero.descricao           == null  
        ){
                return MESSAGE.ERROR_REQUIRED_FILES //400
            }else{
                //Validar se o id existe no BD
                let resultGenero = await buscarGenero(parseInt(id))

                if(resultGenero.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    genero.id = parseInt(id)
                    let result = await generoDAO.updateGenero(genero)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultGenero.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    }catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir um jogo
const excluirGenero = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if (id == undefined || id == '' || isNaN(id)) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }
      if(id){
        let verificar = await generoDAO.selectByIdGenero(id)
        let resultGenero = await generoDAO.selectByIdGenero(id)

        if(verificar != false || typeof(verificar) == 'object'){
            if(verificar.length > 0){
                if(resultGenero){
                    return MESSAGE.SUCCESS_DELETED_ITEM
                }else {
                    return MESSAGE.ERROR_NOT_DELETE
                }
            }else {
                return MESSAGE.ERROR_NOT_DELETE
            }
          }else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
          }
        } 
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os gêneros
const listarGenero = async function() {
    try {
      let dadosGenero = {};
  
      let resultGenero = await generoDAO.selectAllGenero();
  
      if (resultGenero && Array.isArray(resultGenero) && resultGenero.length > 0) {
       
        dadosGenero.status = true
        dadosGenero.status_code = 200
        dadosGenero.items = resultGenero.length
        dadosGenero.generos = resultGenero
  
        return dadosGenero
      } else {
        return MESSAGE.ERROR_NOT_FOUND
      }
    } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
  }
  

//Função para buscar um jogo
const buscarGenero = async function(id) { //recebe ID
    try {
        let dadosGenero = {}

        //verifica se o ID foi passado correto
        if (id == undefined || id == '' || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultGenero = await generoDAO.selectByIdGenero(id)

        if (resultGenero) {
            dadosGenero.status = true
            dadosGenero.status_code = 200
            dadosGenero.game = resultGenero

            return dadosGenero  //200
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}