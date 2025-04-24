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

const insertGenero = async function(genero){
  try {

      let sql = `insert into tbl_genero(
                                      nome_genero,
                                      descricao_genero
                                      ) values (
                                      '${genero.nome_genero}',
                                      '${genero.descricao_genero}'
                                      )`
      //Executa o script SQL no BD e Aguarda o retorno do BD                                
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else 
        return false 
  } catch (error){
    console.log(error)
    return false
  }                                  
}

const updateGenero = async function(genero){
  try{
    let sql = `update tbl_genero set    nome_genero               = '${genero.nome_genero}',
                                        descricao_genero          = '${genero.descricao_genero}'`

      let result = await prisma.$executeRawUnsafe(sql)
    
      if(result)
        return true
      else 
        return false
  }catch (error) {
    return false 
  }
}

const deleteGenero = async function(idGenero) {
  try {
    //Deleta pelo ID
    let sql = `DELETE FROM tbl_genero WHERE id = ${idGenero}`
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true 
    else
      return false 
    
  } catch (error) {
    return false
  }
}

const selectAllGenero = async function() {
  try {
    // Script SQL para retornar todos os gêneros cadastrados
    let sql = 'SELECT * FROM tbl_genero ORDER BY id_genero DESC';  // Corrigido para refletir a ordem correta

    // Executa o Script SQL e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql);  // Usando a função adequada para execução de SQL

    // Verifica se algum gênero foi encontrado
    if (result && result.length > 0) {
      console.log('Gêneros encontrados:', result);  // Para fins de depuração
      return result;  // Retorna os dados encontrados
    } else {
      console.log('Nenhum gênero encontrado');
      return false;  // Nenhum registro encontrado
    }
  } catch (error) {
    console.error('Erro ao buscar todos os gêneros:', error);  // Para fins de depuração
    return false;  // Caso ocorra algum erro
  }
};


const selectByIdGenero = async function(id) {
  try {
    console.log(`Buscando gênero com id_genero = ${id}`);  

    let sql = `SELECT * FROM tbl_genero WHERE id_genero = ${id}`; 

    let result = await prisma.$queryRawUnsafe(sql);

    console.log('Resultado da consulta:', result); 

    if (result.length > 0) {
      return result;
    } else {
      console.log('Nenhum gênero encontrado para o id:', id);
      return false; // Não encontrou nenhum registro
    }
  } catch (error) {
    console.error('Erro ao buscar gênero por ID:', error); // Log do erro
    return false; // Caso ocorra um erro
  }
};



module.exports = {
  insertGenero,
  updateGenero,
  deleteGenero,
  selectAllGenero,
  selectByIdGenero
}