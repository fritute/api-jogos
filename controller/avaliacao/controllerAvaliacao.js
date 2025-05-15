/*************************************************************************
Objetivo: Controller responsável pela regra de negócio da tabela de avaliações
Data: 17/05/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const avaliacaoDAO = require('../../model/DAO/avaliacao.js');
const MESSAGE = require('../../modulo/config.js');

// Inserir uma avaliação
async function inserirAvaliacao(comentario, pontuacao, id_jogo) {
    try {
        // Validação: Verifica se os campos obrigatórios foram preenchidos
        if (!comentario || !pontuacao || !id_jogo || isNaN(pontuacao) || isNaN(id_jogo) || pontuacao <= 0 || id_jogo <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await avaliacaoDAO.insertAvaliacao(comentario, pontuacao, id_jogo);

        if (result) {
            return MESSAGE.SUCCESS_CREATED_ITEM; // 201
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error('Erro ao inserir avaliação:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Atualizar uma avaliação
async function atualizarAvaliacao(id_avaliacao, comentario, pontuacao, id_jogo) {
    try {
        // Validação: Verifica se os campos obrigatórios foram preenchidos
        if (!id_avaliacao || !comentario || !pontuacao || !id_jogo || isNaN(id_avaliacao) || isNaN(pontuacao) || isNaN(id_jogo) || pontuacao <= 0 || id_jogo <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await avaliacaoDAO.updateAvaliacao(id_avaliacao, comentario, pontuacao, id_jogo);

        if (result) {
            return MESSAGE.SUCCESS_UPDATED_ITEM; // 200
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao atualizar avaliação:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Deletar uma avaliação
async function deletarAvaliacao(id_avaliacao) {
    try {
        // Validação: Verifica se o ID da avaliação é válido
        if (!id_avaliacao || isNaN(id_avaliacao) || id_avaliacao <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await avaliacaoDAO.deleteAvaliacao(id_avaliacao);

        if (result) {
            return MESSAGE.SUCCESS_DELETED_ITEM; // 200
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao deletar avaliação:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Listar todas as avaliações de um jogo
// Listar todas as avaliações de um jogo
async function listarAvaliacoesPorJogo(id_jogo) {
    try {
        // Validação: Verifica se o ID do jogo é válido
        if (!id_jogo || isNaN(id_jogo) || id_jogo <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        // Chama o DAO para buscar as avaliações do jogo
        let result = await avaliacaoDAO.selectAvaliacoesByJogo(id_jogo);

        // Verifica se há resultados
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
// Listar todas as avaliações
// Listar todas as avaliações
async function listarTodasAvaliacoes() {
    try {
        // Chama o DAO para buscar todas as avaliações
        let result = await avaliacaoDAO.selectAllAvaliacoes();

        // Verifica se há resultados
        if (result) {
            return {
                status: true,
                status_code: 200,
                message: "Todas as avaliações encontradas com sucesso.",
                data: result
            };
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao listar todas as avaliações:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    listarAvaliacoesPorJogo,
    listarTodasAvaliacoes
};