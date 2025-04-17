/*************************************************************************
Objetivo: Controller responsável pela regra de negócio do CRUD da empresa
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

// Importa o status
const MESSAGE = require('../../modulo/config.js');
// Import do DAO para realizar o CRUD no BD
const empresaDAO = require('../../model/DAO/empresa.js');

// Função para inserir uma nova empresa
async function insertEmpresa(empresa, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                empresa.nome == undefined ||
                empresa.nome == '' ||
                empresa.nome == null ||
                empresa.nome.length > 80 ||
                empresa.criador_jogo == undefined ||
                empresa.criador_jogo == '' ||
                empresa.criador_jogo == null ||
                empresa.tipo == undefined ||
                empresa.tipo == '' ||
                empresa.tipo == null ||
                empresa.descricao_empresa == undefined ||
                empresa.descricao_empresa == '' ||
                empresa.descricao_empresa == null
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                console.log('Chamando DAO para inserir empresa...');
                let resultEmpresa = await empresaDAO.insertEmpresa(empresa);

                if (resultEmpresa) {
                    return MESSAGE.SUCCESS_CREATED_ITEM; // 201
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.error(`Erro ao inserir empresa:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para atualizar uma empresa
async function atualizarEmpresa(empresa, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                empresa.nome == undefined ||
                empresa.nome == '' ||
                empresa.nome == null ||
                empresa.nome.length > 80 ||
                empresa.criador_jogo == undefined ||
                empresa.criador_jogo == '' ||
                empresa.criador_jogo == null ||
                empresa.tipo == undefined ||
                empresa.tipo == '' ||
                empresa.tipo == null ||
                empresa.descricao_empresa == undefined ||
                empresa.descricao_empresa == '' ||
                empresa.descricao_empresa == null ||
                id == undefined ||
                isNaN(id) ||
                id == null ||
                id == "" ||
                id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verifica se a empresa existe
                let resultEmpresa = await buscarEmpresa(parseInt(id));
                if (resultEmpresa.status_code == 200) {
                    // Atualiza os dados da empresa no BD
                    empresa.id_empresa = parseInt(id);
                    let result = await empresaDAO.updateEmpresa(empresa);

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
        console.error(`Erro ao atualizar empresa com ID ${id}:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para excluir uma empresa
async function excluirEmpresa(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Verifica se a empresa existe
            let resultEmpresa = await empresaDAO.selectByIdEmpresa(id);

            if (resultEmpresa) {
                let result = await empresaDAO.deleteEmpresa(id);

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
        console.error(`Erro ao excluir empresa com ID ${id}:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para listar todas as empresas
async function listarEmpresa() {
    try {
        let dadosEmpresas = {};
        // Chama a função para retornar os dados das empresas
        let resultEmpresa = await empresaDAO.selectAllEmpresas();

        if (resultEmpresa && typeof resultEmpresa === 'object') {
            // Cria um objeto do tipo JSON para retornar a lista de empresas
            if (resultEmpresa.length > 0) {
                dadosEmpresas.status = true;
                dadosEmpresas.status_code = 200;
                dadosEmpresas.items = resultEmpresa.length;
                dadosEmpresas.empresas = resultEmpresa;

                return dadosEmpresas; // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error(`Erro ao listar empresas:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para buscar uma empresa pelo ID
async function buscarEmpresa(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Chama a função do DAO para buscar a empresa pelo ID
            let empresa = await empresaDAO.selectByIdEmpresa(id);

            if (empresa) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Empresa encontrada com sucesso.",
                    data: empresa
                };
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error(`Erro ao buscar empresa com ID ${id}:`, error); // Log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    insertEmpresa,
    atualizarEmpresa,
    excluirEmpresa,
    listarEmpresa,
    buscarEmpresa
};