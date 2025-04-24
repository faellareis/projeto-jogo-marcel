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

const insertDesenvolvedoras = async function(desenvolvedoras){
  try {

    let sql = `insert into tbl_desenvolvedoras(
      data_fundacao
    ) values (
      '${desenvolvedoras.data_fundacao}'
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
 
const updateDesenvolvedoras = async function(desenvolvedoras){
  try {
    let sql = `UPDATE tbl_desenvolvedoras 
               SET data_fundacao = '${desenvolvedoras.data_fundacao}'
               WHERE id_desenvolvedoras = ${desenvolvedoras.id_desenvolvedoras}`

    let result = await prisma.$executeRawUnsafe(sql)

    return result ? true : false

  } catch (error) {
    console.error("Erro ao atualizar desenvolvedora no DAO:", error)
    return false 
  }
}


const deleteDesenvolvedoras = async function(id) {
  try {
    let sql = `DELETE FROM tbl_desenvolvedoras WHERE id_desenvolvedoras = ${id}`;
    let result = await prisma.$executeRawUnsafe(sql);

    return result ? true : false;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return false;
  }
}


const selectAllDesenvolvedoras = async function () {
  try {
      let sql = `SELECT * FROM tbl_desenvolvedoras`
      let result = await prisma.$queryRawUnsafe(sql)
      return result
  } catch (error) {
      console.error('Erro no DAO:', error)
      return false
  }
}


const selectByIDdesenvolvedoras = async function(id) {
  try {
    let sql = `SELECT * FROM tbl_desenvolvedoras WHERE id_desenvolvedoras = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    console.log('Resultado da consulta:', result);

    if (result.length > 0) {
      return result
    } else {
      return []
    }

  } catch (error) {
    console.error("Erro ao buscar desenvolvedora no DAO:", error)
    return []
  }
}


module.exports = {
  insertDesenvolvedoras,
  updateDesenvolvedoras,
  deleteDesenvolvedoras,
  selectAllDesenvolvedoras,
  selectByIDdesenvolvedoras
}