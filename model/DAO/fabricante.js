/***********************************************
* Objetivo: Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
* Data: 17/04/2025
* Autor: Rafa
* Versão: 1.0
************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia do prisma client, para gerar um objeto
const prisma = new PrismaClient()

const insertFabricante = async function(fabricante){
  try {

      let sql = `insert into tbl_fabricante(
                                      data_lancamento
                                      ) values (
                                      '${fabricante.data_lancamento}'
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
 
const updateFabricante = async function(fabricante){
  try{
    let sql = `update tbl_fabricante set    
                                      data_lancamento = '${fabricante.data_lancamento}'`

      let result = await prisma.$executeRawUnsafe(sql)
    
      if(result)
        return true
      else 
        return false
  }catch (error) {
    return false 
  }
}

const deleteFabricante = async function(idFabricante) {
  try {
    //Deleta pelo ID
    let sql = `DELETE FROM tbl_fabricante WHERE id = ${idFabricante}`
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
}

const selectAllFabricante = async function(){
  try{
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_fabricante order by id desc'

    //Executa o Script SQL e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result
    else 
      return false

  } catch (error) {
      return false 
  }
}

const selectByIDFabricante = async function(id) {
  try {
    //Busca apenas pelo ID
    let sql = `SELECT * FROM tbl_fabricante WHERE id = ${id}` 

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
  insertFabricante,
  updateFabricante,
  deleteFabricante,
  selectAllFabricante,
  selectByIDFabricante
}