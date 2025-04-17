/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do genero
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/
//Importa o status
const MESSAGE = require('../../modulo/config.js')
//  Import do DAO para realizar o CRUD no BD
const generoDAO = require('../../model/DAO/genero.js')
//Função inserir um novo genero
async function insertGenero(genero, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                genero.nome_genero == undefined ||
                genero.nome_genero == '' ||
                genero.nome_genero == null ||
                genero.nome_genero.length > 80
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Encaminha os dados do novo gênero para ser inserido no BD
                let resultGenero = await generoDAO.insertGenero(genero);

                if (resultGenero) {
                    return MESSAGE.SUCCESS_CREATED_ITEM; // 201
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(`Erro ao inserir gênero:`, error); // Adicione log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
async function atualizarGenero(genero, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                genero.nome_genero == undefined || 
                genero.nome_genero == '' || 
                genero.nome_genero == null || 
                genero.nome_genero.length > 80 ||
                id == undefined || 
                isNaN(id) || 
                id == null || 
                id == "" || 
                id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verifica se o gênero existe
                let resultGenero = await buscarGenero(parseInt(id));
                if (resultGenero.status_code == 200) {
                    // Atualiza os dados do gênero no BD
                    genero.id_genero = parseInt(id);
                    let result = await generoDAO.updateGenero(genero);

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
        console.error(`Erro ao atualizar gênero com ID ${id}:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
async function excluirGenero(id) {
    try {
        let result = await generoDAO.deleteGenero(id)
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }else{
            let result = await generoDAO.selectByIdGeneros(id)
        }
        if (result) {
            return MESSAGE.SUCCESS_DELETED_ITEM // 200
        } else {
            return MESSAGE.ERROR_DELETE_ITEM // 404
        }
    } catch (error) {
        console.error(`Erro ao excluir jogo com ID ${id}:`) 
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
async function listarGenero() {
    try {
        let dadosGeneros = {};
        // Chama a função para retornar os dados do gênero
        let resultGenero = await generoDAO.selectAllGeneros();

        if (resultGenero && typeof resultGenero === 'object') {
            // Cria um objeto do tipo JSON para retornar a lista de gêneros
            if (resultGenero.length > 0) {
                dadosGeneros.status = true;
                dadosGeneros.status_code = 200;
                dadosGeneros.items = resultGenero.length;
                dadosGeneros.generos = resultGenero;

                return dadosGeneros; // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error(`Erro ao listar gêneros:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
async function buscarGenero(id) {
    try {
        // Validação para garantir que o ID é válido
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Chama a função do DAO para buscar o gênero pelo ID
            let genero = await generoDAO.selectByIdGeneros(id);

            if (genero) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Gênero encontrado com sucesso.",
                    data: genero
                };
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error(`Erro ao buscar gênero com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
module.exports = {
    insertGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero

}