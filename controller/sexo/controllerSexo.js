/*************************************************** 
* Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
* Data: 10/04/2025
* Autor: Rafa
* Versão: 1.0
****************************************************/

//Import do arquivo de configuração para mensagens e status code 
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const sexoDAO = require('../../model/DAO/sexo.js')

//Função para inserir um novo sexo
const inserirSexo = async function(sexo, contentType){
    try {

        if(contentType == 'application/json'){
        if
        (sexo.sigla          == undefined    || sexo.sigla            == ''   ||  sexo.sigla            == null     || sexo.sigla.length            > 1  ||
         sexo.nome            == undefined   || sexo.nome            == ''    ||  sexo.nome             == null     || sexo.nome.length             > 20  
        ){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }else{
            //Encaminha os dados do novo jogo para ser inserido no BD
            let resultSexo = await sexoDAO.insertSexo(sexo)

            if(resultSexo)
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

const atualizarSexo = async function(sexo, id, contentType){
    try{

        if(contentType == 'application/json'){
            if
            (sexo.sigla           == undefined   || sexo.sigla            == ''   ||  sexo.sigla            == null     || sexo.sigla.length            > 1  ||
             sexo.nome            == undefined   || sexo.nome            == ''    ||  sexo.nome             == null     || sexo.nome.length            > 20  
            ){
                return MESSAGE.ERROR_REQUIRED_FILES //400
            }else{
                //Validar se o id existe no BD
                let resultSexo = await buscarSexo(parseInt(id))

                if(resultSexo.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    sexo.id = parseInt(id)
                    let result = await sexoDAO.updateSexo(sexo)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultSexo.status_code == 404){
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
const excluirSexo = async function(id) {
    try {
  
      // Verifica se o ID foi passado corretamente
      if (id == undefined || id == '' || isNaN(id)) {
        return MESSAGE.ERROR_REQUIRED_FILES // 400 
      }
      if(id){
        let verificar = await sexoDAO.selectByIdSexo(id)
        let resultSexo = await sexoDAO.deleteSexo(id)

        if(verificar != false || typeof(verificar) == 'object'){
            if(verificar.length > 0){
                if(resultSexo){
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

//Função para retornar todos os Sexos
const listarSexo = async function() {
    try {
        let dadosSexo = {}

        console.log("Tentando buscar todos os sexos...");

        // Chama a função para retornar os dados do banco
        let resultSexo = await sexoDAO.selectAllSexo()

        console.log("Resultado da consulta ao banco:", resultSexo);

        if (resultSexo !== false && Array.isArray(resultSexo)) {
            if (resultSexo.length > 0) {
                dadosSexo.status = true
                dadosSexo.status_code = 200
                dadosSexo.items = resultSexo.length
                dadosSexo.games = resultSexo
                return dadosSexo // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            console.error("Erro ao buscar dados no banco: resultado inválido", resultSexo);
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        console.error("Erro na função listarSexo:", error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para buscar um jogo
const buscarSexo = async function(id) { //recebe ID
    try {
        let dadosSexo = {}

        //verifica se o ID foi passado correto
        if (id == undefined || id == '' || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }

        let resultSexo = await sexoDAO.selectByIdSexo(id)

        if (resultSexo) {
            dadosSexo.status = true
            dadosSexo.status_code = 200
            dadosSexo.game = resultSexo

            return dadosSexo  //200
        } else {
            return MESSAGE.ERROR_NOT_FOUND //404
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo
}