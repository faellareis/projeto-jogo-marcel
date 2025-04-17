/***********************************************
* Objetivo: Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
* Data: 13/02/2025
* Autor: Rafa
* Versão: 1.0
************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no banco de dados um novo jogo
const insertJogo = async function(jogo){
  try {

      let sql = `insert into tbl_jogo(
                                      nome,
                                      data_lancamento,
                                      versao,
                                      tamanho,
                                      descricao,
                                      foto_capa,
                                      link
                                      ) values (
                                      '${jogo.nome}',
                                      '${jogo.data_lancamento}',
                                      '${jogo.versao}',
                                      '${jogo.tamanho}',
                                      '${jogo.descricao}',
                                      '${jogo.foto_capa}',
                                      '${jogo.link}'
                                      )`
      //Executa o script SQL no BD e Aguarda o retorno do BD                                
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else 
        return false 
  } catch (error){
    //console.log(error)
    return false
  }                                  
}

//Função para atualizar no banco de dados um jogo existente 
const updateJogo = async function(jogo){
  try{
    let sql = `update tbl_jogo set    nome            = '${jogo.nome}',
                                      data_lancamento = '${jogo.data_lancamento}',
                                      versao          = '${jogo.versao}',
                                      tamanho         = '${jogo.tamanho}',
                                      descricao       = '${jogo.descricao}',
                                      foto_capa       = '${jogo.foto_capa}',
                                      link            = '${jogo.link}'
                                      where id        = '${jogo.id}'`

      let result = await prisma.$executeRawUnsafe(sql)
    
      if(result)
        return true
      else 
        return false
  }catch (error) {
    return false 
  }
}

//Função para excluir no banco de dados um jogo existente
const deleteJogo = async function(idJogo) {
  try {
    //Deleta pelo ID
    let sql = `DELETE FROM tbl_jogo WHERE id = ${idJogo}`
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
}


//Função para retornar do banco de dados uma lista de jogos
const selectAllJogo = async function(){
  try{

    let sql = 'select * from tbl_jogo order by id desc'

    
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result
    else 
      return false

  } catch (error) {
      return false 
  }
}

// Função para buscar no banco de dados um jogo pelo ID
const selectByIdJogo = async function(id) {
  try {
    //Busca apenas pelo ID
    let sql = `SELECT * FROM tbl_jogo WHERE id = ${id}` 

    //Executa o Script SQL e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql)

    //Confere se encontrou algo
    if (result.length > 0)
      return result
    else 
      return false 

  } catch (error) {
    return false
  }
}

module.exports = {
  insertJogo,
  updateJogo,
  deleteJogo,
  selectAllJogo,
  selectByIdJogo
}