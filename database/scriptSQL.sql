create database db_controle_jogos_bb;

use db_controle_jogos_bb;

create table tbl_jogos (
	id 					int not null primary key auto_increment,
	nome 				varchar(80) not null,
	data_lancamento 	date not null,
    versao 				varchar(10) not null,
    tamanho 			varchar(10),
    descricao 			text,
    foto_capa 			varchar(200),
    link 				varchar(200)
);

create table tbl_sexo (
	id_sexo int not null primary key auto_increment,
	sigla varchar(1) not null,
	nome varchar(20) not null
);

create table tbl_genero (
	id_genero int not null primary key auto_increment,
	nome_genero varchar(45) not null,
	descricao_genero text not null
);

create table tbl_desenvolvedoras(
	id_desenvolvedoras int not null primary key auto_increment,
	data_fundacao date 
);

create table tbl_fabricante (
	id_fabricante int primary key auto_increment,
	nome_fabricante varchar (45) not null
);

show tables;
desc tbl_jogos; 