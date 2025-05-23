create database db_controle_jogos_bb;

use db_controle_jogos_bb;

create table tbl_jogo(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lacamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200)
);

CREATE TABLE tbl_avaliacao (
    id_avaliacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comentario TEXT NOT NULL,
    pontuacao INT NOT NULL,
    id_jogo INT NOT NULL
);

CREATE TABLE tbl_genero (
  id_genero INT NOT NULL AUTO_INCREMENT,
  tbl_nome_id_nome INT NOT NULL,
  nome_genero VARCHAR(70) NULL,
  PRIMARY KEY (id_genero));
  
CREATE TABLE tbl_jogo_genero (
    id_jogo_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT fk_tbl_jogo_categoria_tbl_jogo1
        FOREIGN KEY (id)
        REFERENCES tbl_jogo (id),
    CONSTRAINT fk_tbl_jogo_categoria_tbl_categoria1
        FOREIGN KEY (id_categoria)
        REFERENCES tbl_genero (id_genero)
);

CREATE TABLE tbl_usuario (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(70) NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    tbl_jogo_id INT NOT NULL,
    CONSTRAINT fk_tbl_usuario_tbl_jogo1
        FOREIGN KEY (tbl_jogo_id)
        REFERENCES tbl_jogo (id)
);

CREATE TABLE tbl_lista_de_desejos (
    id_lista_de_desejos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    data_adicao VARCHAR(45) NULL,
    id INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_tbl_lista_de_desejos_tbl_jogo1
        FOREIGN KEY (id)
        REFERENCES tbl_jogo (id),
    CONSTRAINT fk_tbl_lista_de_desejos_tbl_usuario1
        FOREIGN KEY (id_usuario)
        REFERENCES tbl_usuario (id_usuario)
);

CREATE TABLE tbl_plataforma (
    id_plataforma INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(100) NULL,
    nome_plataforma VARCHAR(30) NULL
);

CREATE TABLE tbl_plataforma_jogo (
    id_plataforma_jogo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id INT NOT NULL,
    id_plataforma INT NOT NULL,
    CONSTRAINT fk_tbl_plataforma_jogo_tbl_jogo1
        FOREIGN KEY (id)
        REFERENCES tbl_jogo (id),
    CONSTRAINT fk_tbl_plataforma_jogo_tbl_plataforma1
        FOREIGN KEY (id_plataforma)
        REFERENCES tbl_plataforma (id_plataforma)
);

CREATE TABLE tbl_empresa (
  id_empresa primary key INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  criador_jogo VARCHAR(60) NULL,
  tipo VARCHAR(10) NOT NULL,
  descricao_empresa VARCHAR(100) NOT NULL,
 )
;

CREATE TABLE tbl_empresa_jogo (
    id_empresa_jogo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id INT NOT NULL,
    id_empresa INT NOT NULL,
    CONSTRAINT fk_tbl_empresa_jogo_tbl_jogo1
        FOREIGN KEY (id)
        REFERENCES tbl_jogo (id),
    CONSTRAINT fk_tbl_empresa_jogo_tbl_empresa1
        FOREIGN KEY (id_empresa)
        REFERENCES tbl_empresa (id_empresa)
);
CREATE TABLE tbl_usuario_jogo (
    id_usuario_jogo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_jogo INT NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario (id_usuario),
    CONSTRAINT fk_jogo FOREIGN KEY (id_jogo) REFERENCES tbl_jogo (id)
);





show tables;
desc tbl_jogo;