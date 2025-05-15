// filepath: /c:/Users/24124573/Documents/api-jogos/model/DAO/jogo_genero.js

/*************************************************************************
Objetivo: DAO responsável pelo CRUD da tabela intermediária entre jogos e gêneros
Data: 17/05/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// Inserir um relacionamento entre jogo e gênero
async function insertJogoGenero(id, idCategoria) {
    try {
        let sql = `
            INSERT INTO tbl_jogo_genero (id, id_categoria)
            VALUES (${id}, ${idCategoria})
        `;

        console.log('SQL para inserir relacionamento jogo-gênero:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        console.error('Erro ao inserir relacionamento jogo-gênero:', error);
        return false;
    }
}

// Deletar um relacionamento entre jogo e gênero
async function deleteJogoGenero(id, idCategoria) {
    try {
        let sql = `
            DELETE FROM tbl_jogo_genero
            WHERE id = ${id} AND id_categoria = ${idCategoria}
        `;

        console.log('SQL para deletar relacionamento jogo-gênero:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        console.error('Erro ao deletar relacionamento jogo-gênero:', error);
        return false;
    }
}

// Listar todos os gêneros de um jogo
async function selectGenerosByJogo(id) {
    try {
        let sql = `
            SELECT g.id_genero, g.nome_genero
            FROM tbl_jogo_genero jg
            INNER JOIN tbl_genero g ON jg.id_categoria = g.id_genero
            WHERE jg.id = ${id}
        `;

        console.log('SQL para listar gêneros de um jogo:', sql);

        let result = await prisma.$queryRawUnsafe(sql);

        return result.length > 0 ? result : false;
    } catch (error) {
        console.error('Erro ao listar gêneros de um jogo:', error);
        return false;
    }
}

// Listar todos os jogos de um gênero
async function selectJogosByGenero(idCategoria) {
    try {
        let sql = `
            SELECT j.id, j.nome
            FROM tbl_jogo_genero jg
            INNER JOIN tbl_jogo j ON jg.id = j.id
            WHERE jg.id_categoria = ${idCategoria}
        `;

        console.log('SQL para listar jogos de um gênero:', sql);

        let result = await prisma.$queryRawUnsafe(sql);

        return result.length > 0 ? result : false;
    } catch (error) {
        console.error('Erro ao listar jogos de um gênero:', error);
        return false;
    }
}

async function updateJogoGenero(idAntigo, idCategoriaAntiga, idNovo, idCategoriaNova) {
    try {
        let sql = `
            UPDATE tbl_jogo_genero
            SET id = ${idNovo}, id_categoria = ${idCategoriaNova}
            WHERE id = ${idAntigo} AND id_categoria = ${idCategoriaAntiga}
        `;

        console.log('SQL para atualizar relacionamento jogo-gênero:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result > 0 ? true : false;
    } catch (error) {
        console.error('Erro ao atualizar relacionamento jogo-gênero:', error);
        return false;
    }
}

module.exports = {
    insertJogoGenero,
    deleteJogoGenero,
    selectGenerosByJogo,
    selectJogosByGenero,
    updateJogoGenero
};