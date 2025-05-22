/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Classificações
 * Data: 22/05/2025
 * Autor: Rafa
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo classificacao
const insertAvaliacao = async function(avaliacao){
  try {

      let sql = `insert into tbl_avaliacao ( 
                                          nota,
                                          cometario,
                                          data_avaliacao
                                          ) 
                                          values 
                                        (
                                          '${avaliacao.nota}',
                                          '${avaliacao.comentario}',
                                          '${avaliacao.data_avaliacao}'
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      return false
  }
}

//Função para atualizar um classificacao existente
const updateAvaliacao = async function(avaliacao){
  try {
      let sql = `update tbl_avaliacao set         nota             = '${avaliacao.nota}',
                                                  comentario       = '${avaliacao.comentario}',
                                                  data_avaliacao   = '${avaliacao.data_avaliacao}'
                                            where id = ${avaliacao.id_avaliacao}                
                            `
      let resultAvaliacao = await prisma.$executeRawUnsafe(sql)

      if(resultAvaliacao)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um classificacao existente
const deleteAvaliacao = async function(id){
  try {
    let sql = `delete from tbl_avaliacao where id_avaliacao = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os classificacaos existentes
const selectAllAvaliacao = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_avaliacao order by  id_avaliacao desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um classificacao pelo ID
const selectByIdAvaliacao = async function(id){
  try {
    let sql = `select * from tbl_avaliacao where  id_avaliacao = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
} 