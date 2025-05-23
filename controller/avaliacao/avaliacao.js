/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de avaliacao
 * Data: 22/05/2025
 * Autor: Rafa
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const avaliacaoDAO = require('../../model/DAO/avaliacao.js')

//Função para tratar a inserção de um novo classificacao no DAO
const inserirAvaliacao = async function(avaliacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (avaliacao.nota                   == ''           || avaliacao.nota               == undefined    || avaliacao.nota               == null || avaliacao.nota.length           > 80 ||
                    avaliacao.comentario             == ''           || avaliacao.comentario         == undefined    || avaliacao.comentario         == null || avaliacao.comentario.sigla      > 5  ||
                    avaliacao.data_avaliacao         == ''           || avaliacao.data_avaliacao     == undefined    || avaliacao.data_avaliacao     == null || avaliacao.data_avaliacao.sigla  > 200
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FILES //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)

                    if(resultAvaliacao)
                        return MESSAGE.SUCESS_CREATED_ITEM//201
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um classificacao no DAO
const atualizarAvaliacao = async function(id, avaliacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                               == ''           || id                                == undefined    || id                          == null || isNaN(id)                           || id  <= 0   ||
                    avaliacao.nota                   == ''           || avaliacao.nota                    == undefined    || avaliacao.nota              == null || avaliacao.nota.length          > 80 ||
                    avaliacao.comentario             == ''           || avaliacao.comentario              == undefined    || avaliacao.comentario        == null || avaliacao.comentario.sigla     > 5  ||
                    avaliacao.data_avaliacao         == ''           || avaliacao.data_avaliacao          == undefined    || avaliacao.data_avaliacao    == null || avaliacao.data_avaliacao.sigla > 200
                )
                {
                    return MESSAGE.ERROR_REQUIRED_FILES//400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

                    if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                        if(resultAvaliacao.length > 0 ){
                            //Update
                            //Adiciona o ID do classificacao no JSON com os dados
                            avaliacao.id = parseInt(id)

                            let result = await avaliacaoDAO.updateAvaliacao(avaliacao)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATE_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return MESSAGE.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um classificacao no DAO
const excluirAvaliacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FILES //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                //Se existir, faremos o delete
                if(resultAvaliacao.length > 0){
                    //delete
                    let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))

                    if(result){
                        return MESSAGE.SUCCESS_DELETED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de classificacaos do DAO
const listarAvaliacao = async function(){
    try {
        //Objeto do tipo JSON
        let dadosAvaliacao = {}
        //Chama a função para retornar os classificacaos cadastrados
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
            if(resultAvaliacao.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosAvaliacao.status = true
                dadosAvaliacao.status_code = 200
                dadosAvaliacao.items = resultAvaliacao.length
                dadosAvaliacao.films = resultAvaliacao

                return dadosAvaliacao
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um classificacao filtrando pelo ID do DAO
const buscarAvaliacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosAvaliacao= {}

            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
            
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200
                    dadosAvaliacao.avaliacao = resultAvaliacao

                    return dadosAvaliacao //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao,
    buscarAvaliacao
} 