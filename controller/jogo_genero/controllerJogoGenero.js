/*************************************************************************
Objetivo: Controller responsável pela regra de negócio da tabela intermediária entre jogos e gêneros
Data: 17/05/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const jogoGeneroDAO = require('../../model/DAO/jogo_genero.js');
const MESSAGE = require('../../modulo/config.js');

// Inserir um relacionamento entre jogo e gênero
async function insertJogoGenero(id, idCategoria) {
    try {
        if (!id || isNaN(id) || id <= 0 || !idCategoria || isNaN(idCategoria) || idCategoria <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await jogoGeneroDAO.insertJogoGenero(id, idCategoria);

        if (result) {
            return MESSAGE.SUCCESS_CREATED_ITEM; // 201
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error('Erro ao inserir relacionamento jogo-gênero:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Deletar um relacionamento entre jogo e gênero
async function deleteJogoGenero(id, idGenero) {
    try {
        if (!id || isNaN(id) || id <= 0 || !idGenero || isNaN(idGenero) || idGenero <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await jogoGeneroDAO.deleteJogoGenero(id, idGenero);

        if (result) {
            return MESSAGE.SUCCESS_DELETED_ITEM; // 200
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao deletar relacionamento jogo-gênero:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Listar todos os gêneros de um jogo
async function listarGenerosPorJogo(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        // Chama o DAO para buscar os gêneros associados ao jogo
        let result = await jogoGeneroDAO.selectGenerosByJogo(id);

        if (result) {
            // Monta o array de gêneros
            const generos = result.map((genero) => ({
                id_genero: genero.id_genero,
                nome_genero: genero.nome_genero
            }));

            return {
                status: true,
                status_code: 200,
                message: "Gêneros encontrados com sucesso.",
                data: {
                    id_jogo: id,
                    generos: generos
                }
            };
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao listar gêneros por jogo:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Listar todos os jogos de um gênero
async function listarJogosPorGenero(idGenero) {
    try {
        if (!idGenero || isNaN(idGenero) || idGenero <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await jogoGeneroDAO.selectJogosByGenero(idGenero);

        if (result) {
            return {
                status: true,
                status_code: 200,
                message: "Jogos encontrados com sucesso.",
                data: result
            };
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao listar jogos por gênero:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Atualizar um relacionamento entre jogo e gênero
async function atualizarJogoGenero(idAntigo, idGeneroAntigo, idNovo, idGeneroNovo) {
    try {
        if (
            !idAntigo || isNaN(idAntigo) || idAntigo <= 0 ||
            !idGeneroAntigo || isNaN(idGeneroAntigo) || idGeneroAntigo <= 0 ||
            !idNovo || isNaN(idNovo) || idNovo <= 0 ||
            !idGeneroNovo || isNaN(idGeneroNovo) || idGeneroNovo <= 0
        ) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        }

        let result = await jogoGeneroDAO.updateJogoGenero(idAntigo, idGeneroAntigo, idNovo, idGeneroNovo);

        if (result) {
            return MESSAGE.SUCCESS_UPDATED_ITEM; // 200
        } else {
            return MESSAGE.ERROR_NOT_FOUND; // 404
        }
    } catch (error) {
        console.error('Erro ao atualizar relacionamento jogo-gênero:', error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    insertJogoGenero,
    deleteJogoGenero,
    listarGenerosPorJogo,
    listarJogosPorGenero,
    atualizarJogoGenero
}