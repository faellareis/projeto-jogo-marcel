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
const insertJogoPlataforma = async function(JogoPlataforma){
  try {

      let sql = `insert into tbl_jogo_plataforma  ( 
                                          id_plataforma,
                                          id_jogo
                                        ) 
                                          values 
                                        (
                                          ${JogoPlataforma.id_plataforma},
                                          ${JogoPlataforma.id_jogo}
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
const updateJogoPlataforma = async function(JogoPlataforma){
  try {
      let sql = `update tbl_jogo_plataforma set        id_plataforma         = ${JogoPlataforma.id_plataforma},
                                                       id_jogo               = ${JogoPlataforma.id_jogo}
                                        
                            where id = ${JogoPlataforma.id}                
                            `
      let resultJogoPlataforma = await prisma.$executeRawUnsafe(sql)

      if(resultJogoPlataforma)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoPlataforma = async function(id){
  try {
    let sql = `delete from tbl_jogo_plataforma where id = ${id}`

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
const selectAllJogoPlataforma = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_plataforma order by id desc'

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
const selectByIdJogoPlataforma = async function(id){
  try {
    let sql = `select * from tbl_jogo_plataforma where id = ${id}`

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
const selectPlataformaByIdJogo = async function(idJogo){
  try {
      let sql = `select tbl_plataforma.* from tbl_jogo 
                          inner join tbl_jogo_plataforma
                            on tbl_jogo.id = tbl_jogo_plataforma.id_jogo
                          inner join tbl_plataforma
                            on tbl_plataforma.id = tbl_jogo_plataforma.id_plataforma
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
const selectJogoByIdPlataforma = async function(idPlataforma){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo
                          inner join tbl_jogo_plataforma
                            on tbl_jogo.id = tbl_jogo_plataforma.id_jogo
                          inner join tbl_plataforma
                            on tbl_plataforma.id =  tbl_jogo_plataforma.id_plataforma
                      where tbl_plataforma.id = ${idPlataforma}`

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
    insertJogoPlataforma,
    updateJogoPlataforma,
    deleteJogoPlataforma,
    selectAllJogoPlataforma,
    selectByIdJogoPlataforma,
    selectPlataformaByIdJogo,
    selectJogoByIdPlataforma
} 