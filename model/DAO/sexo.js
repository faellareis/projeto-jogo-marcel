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
    let sql = `update tbl_sexo set    nome            = '${sexo.nome}',
                                      sigla           = '${sexo.sigla}',`

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
    let sql = `DELETE FROM tbl_sexo WHERE id = ${idSexo}`
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
    // Altere o nome da coluna para o correto, se necessário
    let sql = `SELECT * FROM tbl_sexo WHERE sexo_id = ${id}`;  // Supondo que a coluna correta seja 'sexo_id'

    console.log("Executando consulta SQL:", sql);  // Log para verificar a consulta

    // Executa a consulta SQL
    let result = await prisma.$queryRawUnsafe(sql);

    console.log("Resultado da consulta SQL:", result);  // Log para verificar o resultado da consulta

    if (result && result.length > 0) {
      return result;
    } else {
      console.log(`Nenhum registro encontrado para o ID ${id}`);  // Log se não encontrar nenhum registro
      return false;
    }
  } catch (error) {
    console.error("Erro ao executar a consulta SQL:", error);  // Log de erro se falhar
    return false;
  }
};



module.exports = {
  insertSexo,
  updateSexo,
  deleteSexo,
  selectAllSexo,
  selectByIdSexo
}