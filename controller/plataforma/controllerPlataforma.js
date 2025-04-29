/*************************************************************************
Objetivo: Controller responsável pela regra de negócio do CRUD de plataformas
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

// Importa o status
const MESSAGE = require('../../modulo/config.js');
// Import do DAO para realizar o CRUD no BD
const plataformaDAO = require('../../model/DAO/plataforma.js');

// Função para inserir uma nova plataforma
async function insertPlataforma(plataforma, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                plataforma.nome_plataforma == undefined ||
                plataforma.nome_plataforma == '' ||
                plataforma.nome_plataforma == null ||
                plataforma.nome_plataforma.length > 30 ||
                plataforma.descricao == undefined ||
                plataforma.descricao == '' ||
                plataforma.descricao == null
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Encaminha os dados da nova plataforma para ser inserida no BD
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma);

                if (resultPlataforma) {
                    return MESSAGE.SUCCESS_CREATED_ITEM; // 201
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(`Erro ao inserir plataforma:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
// Função para atualizar uma plataforma
async function atualizarPlataforma(plataforma, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                plataforma.nome_plataforma == undefined ||
                plataforma.nome_plataforma == '' ||
                plataforma.nome_plataforma == null ||
                plataforma.nome_plataforma.length > 30 ||
                plataforma.descricao == undefined ||
                plataforma.descricao == '' ||
                plataforma.descricao == null ||
                id == undefined ||
                isNaN(id) ||
                id == null ||
                id == "" ||
                id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verifica se a plataforma existe
                let resultPlataforma = await buscarPlataforma(parseInt(id));
                if (resultPlataforma.status_code == 200) {
                    // Atualiza os dados da plataforma no BD
                    plataforma.id_plataforma = parseInt(id);
                    let result = await plataformaDAO.updatePlataforma(plataforma);

                    if (result) {
                        return MESSAGE.SUCCESS_UPDATED_ITEM; // 200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; // 404
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(`Erro ao atualizar plataforma com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para excluir uma plataforma
async function excluirPlataforma(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Verifica se a plataforma existe
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(id);

            if (resultPlataforma) {
                let result = await plataformaDAO.deletePlataforma(id);

                if (result) {
                    return MESSAGE.SUCCESS_DELETED_ITEM; // 200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error(`Erro ao excluir plataforma com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para listar todas as plataformas
async function listarPlataformas() {
    try {
        let dadosPlataformas = {};
        // Chama a função para retornar os dados das plataformas
        let resultPlataforma = await plataformaDAO.selectAllPlataformas();

        if (resultPlataforma && typeof resultPlataforma === 'object') {
            // Cria um objeto do tipo JSON para retornar a lista de plataformas
            if (resultPlataforma.length > 0) {
                dadosPlataformas.status = true;
                dadosPlataformas.status_code = 200;
                dadosPlataformas.items = resultPlataforma.length;
                dadosPlataformas.plataformas = resultPlataforma;

                return dadosPlataformas; // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error(`Erro ao listar plataformas:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para buscar uma plataforma pelo ID
async function buscarPlataforma(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Chama a função do DAO para buscar a plataforma pelo ID
            let plataforma = await plataformaDAO.selectByIdPlataforma(id);

            if (plataforma) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Plataforma encontrada com sucesso.",
                    data: plataforma
                };
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error(`Erro ao buscar plataforma com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    insertPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataformas,
    buscarPlataforma
};