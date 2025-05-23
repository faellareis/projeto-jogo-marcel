/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 25/05/2025
 * Autor: Rafa
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertJogoDesenvolvedoras = async function(JogoDesenvolvedoras){
  try {

      let sql = `insert into tbl_jogo_desenvolvedoras  ( 
                                          id_desenvolvedoras ,
                                          id_jogo
                                        ) 
                                          values 
                                        (
                                          ${JogoDesenvolvedoras.id_desenvolvedoras},
                                          ${JogoDesenvolvedoras.id_jogo}
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

//Função para atualizar um FilmeGenero existente
const updateJogoDesenvolvedoras = async function(JogoDesenvolvedoras){
  try {
      let sql = `update tbl_jogo_desenvolvedoras set        id_desenvolvedoras         = ${JogoDesenvolvedoras.id_desenvolvedoras},
                                                            id_jogo                    = ${JogoDesenvolvedoras.id_jogo}
                                        
                            where id = ${JogoDesenvolvedoras.id}                
                            `
      let resultJogoDesenvolvedoras = await prisma.$executeRawUnsafe(sql)

      if(resultJogoDesenvolvedoras)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoDesenvolvedoras = async function(id){
  try {
    let sql = `delete from tbl_jogo_desenvolvedoras where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoDesenvolvedoras = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_desenvolvedoras order by id desc'

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

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoDesenvolvedoras = async function(id){
  try {
    let sql = `select * from tbl_jogo_desenvolvedoras where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados do genero filtrando pelo Filme
const selectDesenvolvedorasByIdJogo = async function(idJogo){
  try {
      let sql = `select tbl_desenvolvedoras.* from tbl_jogo 
                          inner join tbl_jogo_desenvolvedoras
                            on tbl_jogo.id = tbl_jogo_desenvolvedoras.id_jogo
                          inner join tbl_desenvolvedoras
                            on tbl_desenvolvedoras.id = tbl_jogo_desenvolvedoras.id_desenvolvedoras
                      where tbl_jogo.id = ${idJogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados do filme filtrando pelo Genero
const selectJogoByIdDesenvolvedoras = async function(idDesenvolvedoras){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo
                          inner join tbl_jogo_desenvolvedoras
                            on tbl_jogo.id = tbl_jogo_tbl_jogo_desenvolvedoras.id_jogo
                          inner join tbl_tbl_jogo_desenvolvedoras
                            on tbl_tbl_jogo_desenvolvedoras.id =  tbl_jogo_tbl_jogo_desenvolvedoras.id_tbl_jogo_desenvolvedoras
                      where tbl_tbl_jogo_desenvolvedoras.id = ${idDesenvolvedoras}`

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
    insertJogoDesenvolvedoras,
    updateJogoDesenvolvedoras,
    deleteJogoDesenvolvedoras,
    selectAllJogoDesenvolvedoras,
    selectByIdJogoDesenvolvedoras,
    selectDesenvolvedorasByIdJogo,
    selectJogoByIdDesenvolvedoras
} 