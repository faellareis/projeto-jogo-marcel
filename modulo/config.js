/**********************************************************
 * Objetivo: Arquivo de padronização de mensagens e status code para o projeto
 * Data: 20/02/2025
 * Autor: Rafa
 * Versão: 
 **********************************************************/

/*******************MENSAGENS DE ERRO**********************/
const ERROR_REQUIRED_FILES               = {status: false, status_code: 400, message: 
    "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada."} 

const ERROR_INTERNAL_SERVER_CONTROLLER   = {status: false, status_code: 500, message: 
    "Não foi possível processar a requisição pois ocorreram erros internos no servidor da CONTROLLER."}

const ERROR_INTERNAL_SERVER_MODEL        = {status: false, status_code: 500, message: 
    "Não foi possível processar a requisição pois ocorreram erros internos no servidor da MODEL."}

const ERROR_CONTENT_TYPE                 = {status: false, status_code: 415, message:
    "Não foi possível processar a requisição pois o formato de dados encaminhado não é suportado pelo servidor. Favor encaminhar apenas json!"}

const ERROR_NOT_FOUND                    = {status: false, status_code: 404, message: 
    "Não foram encontrado itens para retornar!"}

const ERROR_NOT_DELETE                   = {status: false, status_code: 400, message: 
    "Não foi possível deletar!"}
    
/*******************MENSAGENS DE SUCESSO*******************/
const SUCESS_CREATED_ITEM               = {status: true, status_code: 201, message: 
    "Item criado com sucesso."}

const SUCCESS_DELETED_ITEM              = {status: true, status_code: 200, message: 
    "Item excluido com sucesso."}


module.exports = {
    ERROR_REQUIRED_FILES,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_DELETED_ITEM,
    ERROR_NOT_DELETE
}