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

const insertSexo = async function(sexo){
  try {

      let sql = `insert into tbl_sexo(
                                      nome,
                                      sigla
                                      ) values (
                                      '${sexo.nome}',
                                      '${sexo.sigla}'
                                      )`
      //Executa o script SQL no BD e Aguarda o retorno do BD                                
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else 
        return false 
      } catch (error){
        console.log('Erro no insertSexo:', error)
        return false
    }
                                    
}

const updateSexo = async function(sexo){
  try{
    let sql = `update tbl_sexo          set    nome               = '${sexo.nome}',
                                        sigla                     = '${sexo.sigla}'`

      let result = await prisma.$executeRawUnsafe(sql)
    
      if(result)
        return true
      else 
        return false
  }catch (error) {
    return false 
  }
}

const deleteSexo = async function(idSexo) {
  try {
    //Deleta pelo ID
    let sql = `DELETE FROM tbl_sexo WHERE id_sexo = ${idSexo}`
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
}

const selectAllSexo = async function() {
  try {
      console.log("Executando consulta para selecionar todos os sexos...");

      let sql = 'SELECT * FROM tbl_sexo ORDER BY nome DESC' // Altere aqui para a coluna correta

      let result = await prisma.$queryRawUnsafe(sql)

      console.log("Resultado da consulta:", result);

      if (result) {
          return result
      } else {
          console.error("Nenhum dado retornado ou erro na consulta.");
          return false
      }

  } catch (error) {
      console.error('Erro ao executar a consulta no banco:', error); // Log para depuração
      return false
  }
}

const selectByIdSexo = async function(id) {
  try {
    //Busca apenas pelo ID
    let sql = `SELECT * FROM tbl_sexo WHERE id_sexo = ${id}` 

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
  insertSexo,
  updateSexo,
  deleteSexo,
  selectAllSexo,
  selectByIdSexo
}