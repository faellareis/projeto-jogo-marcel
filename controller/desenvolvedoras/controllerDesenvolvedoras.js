/*************************************************** 
* Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
* Data: 10/04/2025
* Autor: Rafa
* Versão: 1.0
****************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const desenvolvedorasDAO = require('../../model/DAO/desenvolvedoras.js')

//Função para inserir um novo jogo
const inserirDesenvolvedoras = async function(desenvolvedoras, contentType){
    try {

        if(contentType == 'application/json'){
            if (
                desenvolvedoras.data_fundacao == undefined ||
                desenvolvedoras.data_fundacao == '' ||
                desenvolvedoras.data_fundacao == null ||
                desenvolvedoras.data_fundacao.length > 10
              ) {
                return MESSAGE.ERROR_REQUIRED_FILES; // 400
              }
              else{
            //Encaminha os dados do novo jogo para ser inserido no BD
            let resultDesenvolvedoras = await desenvolvedorasDAO.insertDesenvolvedoras(desenvolvedoras)

            if(resultDesenvolvedoras)
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
const atualizarDesenvolvedoras = async function(desenvolvedoras, id, contentType){
    try {
        if (contentType == 'application/json') {
            if (
                desenvolvedoras.data_fundacao == undefined ||
                desenvolvedoras.data_fundacao == '' ||
                desenvolvedoras.data_fundacao == null
            ) {
                return MESSAGE.ERROR_REQUIRED_FILES //400
            } else {
                let resultDesenvolvedoras = await buscarDesenvolvedoras(parseInt(id))

                if (resultDesenvolvedoras.status_code == 200) {
                    desenvolvedoras.id_desenvolvedoras = parseInt(id)
                    let result = await desenvolvedorasDAO.updateDesenvolvedoras(desenvolvedoras)

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else if (resultDesenvolvedoras.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND //404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.error("Erro na controller de atualização:", error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//Função para excluir um jogo
const excluirDesenvolvedoras = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if (id == undefined || id == '' || isNaN(id)) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }
      if(id){
        let verificar = await desenvolvedorasDAO.selectByIDdesenvolvedoras(id)
        let resultDesenvolvedoras = await desenvolvedorasDAO.deleteDesenvolvedoras(id)

        if(verificar != false || typeof(verificar) == 'object'){
            if(verificar.length > 0){
                if(resultDesenvolvedoras){
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

//Função para retornar todos os jogos
const listarDesenvolvedoras = async function () {
    try {
        let dados = await desenvolvedorasDAO.selectAllDesenvolvedoras()

        if (dados && Array.isArray(dados) && dados.length > 0) {
            return {
                status: true,
                status_code: 200,
                data: dados
            }
        } else {
            return {
                status: false,
                status_code: 404,
                message: 'Nenhuma desenvolvedora encontrada.'
            }
        }
    } catch (error) {
        console.error('Erro na controller:', error)
        return {
            status: false,
            status_code: 500,
            message: 'Erro interno ao buscar desenvolvedoras.'
        }
    }
}

//Função para buscar um jogo
const buscarDesenvolvedoras = async function(id) {
    try {
        let dadosDesenvolvedoras = {}

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultDesenvolvedoras = await desenvolvedorasDAO.selectByIDdesenvolvedoras(id)

        // Log para ver o que foi retornado pela função DAO
        console.log("Resultado da busca por ID:", resultDesenvolvedoras)

        if (resultDesenvolvedoras && resultDesenvolvedoras.length > 0) {
            dadosDesenvolvedoras.status = true
            dadosDesenvolvedoras.status_code = 200
            dadosDesenvolvedoras.game = resultDesenvolvedoras
            return dadosDesenvolvedoras //200
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }

    } catch (error) {
        console.error("Erro ao buscar desenvolvedora:", error) // Log do erro
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirDesenvolvedoras,
    atualizarDesenvolvedoras,
    excluirDesenvolvedoras,
    listarDesenvolvedoras,
    buscarDesenvolvedoras
}