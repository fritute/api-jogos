/*************************************************************************
Objetivo: DAO responsável pelo CRUD da tabela de avaliações
Data: 17/05/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inserir uma avaliação
async function insertAvaliacao(comentario, pontuacao, id_jogo) {
    try {
        let sql = `
            INSERT INTO tbl_avaliacao (comentario, pontuacao, id_jogo)
            VALUES ('${comentario}', ${pontuacao}, ${id_jogo})
        `;

        console.log('SQL para inserir avaliação:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        console.error('Erro ao inserir avaliação:', error);
        return false;
    }
}

// Atualizar uma avaliação
async function updateAvaliacao(id_avaliacao, comentario, pontuacao, id_jogo) {
    try {
        let sql = `
            UPDATE tbl_avaliacao
            SET comentario = '${comentario}', pontuacao = ${pontuacao}, id_jogo = ${id_jogo}
            WHERE id_avaliacao = ${id_avaliacao}
        `;

        console.log('SQL para atualizar avaliação:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result > 0 ? true : false;
    } catch (error) {
        console.error('Erro ao atualizar avaliação:', error);
        return false;
    }
}

// Deletar uma avaliação
async function deleteAvaliacao(id_avaliacao) {
    try {
        let sql = `
            DELETE FROM tbl_avaliacao
            WHERE id_avaliacao = ${id_avaliacao}
        `;

        console.log('SQL para deletar avaliação:', sql);

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
    } catch (error) {
        console.error('Erro ao deletar avaliação:', error);
        return false;
    }
}


// Listar todas as avaliações
async function selectAllAvaliacoes() {
    try {
        let sql = `
            SELECT id_avaliacao, comentario, pontuacao, id_jogo
            FROM tbl_avaliacao
        `;

        console.log('SQL para listar todas as avaliações:', sql);

        let result = await prisma.$queryRawUnsafe(sql);

        return result.length > 0 ? result : false;
    } catch (error) {
        console.error('Erro ao listar todas as avaliações:', error);
        return false;
    }
}
// Listar todas as avaliações de um jogo
async function listarAvaliacoesPorJogo(id_jogo) {
    try {
        if (!id_jogo || isNaN(id_jogo) || id_jogo <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await avaliacaoDAO.selectAvaliacoesByJogo(id_jogo);

        if (result) {
            return {
                status: true,
                status_code: 200,
                message: "Avaliações encontradas com sucesso.",
                data: result
            };
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao listar avaliações por jogo:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}


module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacoes,
    listarAvaliacoesPorJogo
};