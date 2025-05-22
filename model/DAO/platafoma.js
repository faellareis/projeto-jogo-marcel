/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de Classificações
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo Genero
const insertPlataforma = async function(plataforma){
  try {

      let sql = `insert into tbl_plataforma  ( 
                                          nome_plataforma
                                          
                                          ) 
                                          values 
                                        (
                                        
                                          '${plataforma.nome_plataforma}'
                                       
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

//Função para atualizar um Genero existente
const updatePlataforma = async function(plataforma){
  try {
      let sql = `update tbl_plataforma set     
                                                  nome_plataforma    = '${plataforma.nome_plataforma}'
                                                  
                                            where id_plataforma = ${plataforma.id_plataforma}                
                            `
      let resultGenero = await prisma.$executeRawUnsafe(sql)

      if(resultGenero)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um Genero existente
const deletePlataforma = async function(id){
  try {
    let sql = `delete from tbl_plataforma where id_plataforma = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os Generos existentes
const selectAllPlataforma = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_plataforma order by id_plataforma desc'

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

//Função para buscar um Genero pelo ID
const selectByIdPlataforma = async function(id){
  try {
    let sql = `select * from tbl_plataforma where id_plataforma = ${id}`

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
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
} 