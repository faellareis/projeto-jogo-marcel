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
const insertJogoPublicoAlvo = async function(JogoPublicoAlvo){
  try {

      let sql = `insert into tbl_jogo_publico_alvo  ( 
                                          id_publico_alvo,
                                          id_jogo
                                        ) 
                                          values 
                                        (
                                          ${JogoPublicoAlvo.id_publico_alvo},
                                          ${JogoPublicoAlvo.id_jogo}
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
const updateJogoPublicoAlvo = async function(JogoPublicoAlvo){
  try {
      let sql = `update tbl_jogo_publico_alvo set        id_publico_alvo       = ${JogoPublicoAlvo.id_publico_alvo},
                                                         id_jogo               = ${JogoPublicoAlvo.id_jogo}
                                        
                            where id = ${JogoPublicoAlvo.id}                
                            `
      let resultJogoPublicoAlvo = await prisma.$executeRawUnsafe(sql)

      if(resultJogoPublicoAlvo)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoPublicoAlvo = async function(id){
  try {
    let sql = `delete from tbl_jogo_publico_alvo where id = ${id}`

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
const selectAllJogoPublicoAlvo = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_publico_alvo order by id desc'

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
const selectByIdJogoPublicoAlvo = async function(id){
  try {
    let sql = `select * from tbl_jogo_publico_alvo where id = ${id}`

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
const selectPublicoAlvoByIdJogo = async function(idJogo){
  try {
      let sql = `select tbl_publico_alvo.* from tbl_jogo 
                          inner join tbl_jogo_publico_alvo
                            on tbl_jogo.id = tbl_jogo_publico_alvo.id_jogo
                          inner join tbl_publico_alvo
                            on tbl_publico_alvo.id = tbl_jogo_publico_alvo.id_publico_alvo
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
const selectJogoByIdPublicoAlvo = async function(idPublicoAlvo){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo
                          inner join tbl_jogo_publico_alvo
                            on tbl_jogo.id = tbl_jogo_publico_alvo.id_jogo
                          inner join tbl_publico_alvo
                            on tbl_publico_alvo.id =  tbl_jogo_publico_alvo.id_publico_alvo
                      where tbl_publico_alvo.id = ${idPublicoAlvo}`

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
    insertJogoPublicoAlvo,
    updateJogoPublicoAlvo,
    deleteJogoPublicoAlvo,
    selectAllJogoPublicoAlvo,
    selectByIdJogoPublicoAlvo,
    selectPublicoAlvoByIdJogo,
    selectJogoByIdPublicoAlvo
} 