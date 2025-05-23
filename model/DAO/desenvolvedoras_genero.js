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
const insertDesenvolvedorasGenero = async function(DesenvolvedorasGenero){
  try {

      let sql = `insert into tbl_desenvolvedoras_genero  ( 
                                          id_desenvolvedoras,
                                          id_jogo
                                        ) 
                                          values 
                                        (
                                          ${DesenvolvedorasGenero.id_desenvolvedoras},
                                          ${DesenvolvedorasGenero.id_jogo}
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
const updateDesenvolvedorasGenero = async function(DesenvolvedorasGenero){
  try {
      let sql = `update tbl_desenvolvedoras_genero set        id_desenvolvedoras    = ${DesenvolvedorasGenero.id_desenvolvedoras},
                                                              id_jogo               = ${DesenvolvedorasGenero.id_jogo}
                                        
                            where id = ${DesenvolvedorasGenero.id}                
                            `
      let resultDesenvolvedorasGenero = await prisma.$executeRawUnsafe(sql)

      if(resultDesenvolvedorasGenero)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteDesenvolvedorasGenero = async function(id){
  try {
    let sql = `delete from tbl_desenvolvedoras_genero where id = ${id}`

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
const selectAllDesenvolvedorasGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_desenvolvedoras_genero order by id desc'

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
const selectByIdDesenvolvedorasGenero = async function(id){
  try {
    let sql = `select * from tbl_desenvolvedoras_genero where id = ${id}`

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
const selectDesenvolvedorasByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_desenvolvedoras.* from tbl_genero 
                          inner join tbl_genero _desenvolvedoras
                            on tbl_genero .id = tbl_genero _desenvolvedoras.id_genero 
                          inner join tbl_desenvolvedoras
                            on tbl_desenvolvedoras.id = tbl_genero _desenvolvedoras.id_desenvolvedoras
                      where tbl_genero .id = ${idGenero}`

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
const selectGeneroByIdDesenvolvedoras = async function(idDesenvolvedoras){
  try {
      let sql = `select tbl_genero.* from tbl_genero
                          inner join tbl_genero_desenvolvedoras
                            on tbl_genero.id = tbl_genero_desenvolvedoras.id_genero
                          inner join tbl_desenvolvedoras
                            on tbl_desenvolvedoras.id =  tbl_genero_desenvolvedoras.id_desenvolvedoras
                      where tbl_desenvolvedoras.id = ${idDesenvolvedoras}`

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
    insertDesenvolvedorasGenero,
    updateDesenvolvedorasGenero,
    deleteDesenvolvedorasGenero,
    selectAllDesenvolvedorasGenero,
    selectByIdDesenvolvedorasGenero,
    selectDesenvolvedorasByIdGenero,
    selectGeneroByIdDesenvolvedoras
} 