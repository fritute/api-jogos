/*************************************************************************
Objetivo: Controller responsável pela regra de negócio do CRUD de usuários
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

// Importa o status
const MESSAGE = require('../../modulo/config.js');
// Import do DAO para realizar o CRUD no BD
const usuarioDAO = require('../../model/DAO/usuario.js');

// Função para inserir um novo usuário
async function insertUsuario(usuario, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                usuario.nome == undefined ||
                usuario.nome == '' ||
                usuario.nome == null ||
                usuario.nome.length > 70 ||
                usuario.email == undefined ||
                usuario.email == '' ||
                usuario.email == null ||
                usuario.email.length > 100 ||
                usuario.senha == undefined ||
                usuario.senha == '' ||
                usuario.senha == null ||
                usuario.senha.length > 20
            ) {
                return { status: false, status_code: 400, message: "Campos obrigatórios não preenchidos ou inválidos." };
            } else {
                // Encaminha os dados do novo usuário para ser inserido no BD
                let resultUsuario = await usuarioDAO.insertUsuario(usuario);

                if (resultUsuario) {
                    return { status: true, status_code: 201, message: "Usuário criado com sucesso." };
                } else {
                    return { status: false, status_code: 500, message: "Erro ao inserir usuário no banco de dados." };
                }
            }
        } else {
            return { status: false, status_code: 415, message: "Content-Type inválido. Use application/json." };
        }
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        return { status: false, status_code: 500, message: "Erro interno no servidor." };
    }
}

// Função para atualizar um usuário
async function atualizarUsuario(usuario, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                usuario.nome == undefined ||
                usuario.nome == '' ||
                usuario.nome == null ||
                usuario.nome.length > 70 ||
                usuario.email == undefined ||
                usuario.email == '' ||
                usuario.email == null ||
                usuario.email.length > 100 ||
                usuario.senha == undefined ||
                usuario.senha == '' ||
                usuario.senha == null ||
                usuario.senha.length > 20 ||
                usuario.tbl_jogo_id == undefined ||
                isNaN(usuario.tbl_jogo_id) ||
                usuario.tbl_jogo_id == null ||
                usuario.tbl_jogo_id <= 0 ||
                id == undefined ||
                isNaN(id) ||
                id == null ||
                id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
            } else {
                // Verifica se o usuário existe
                let resultUsuario = await buscarUsuario(parseInt(id));
                if (resultUsuario.status_code == 200) {
                    // Atualiza os dados do usuário no BD
                    usuario.id_usuario = parseInt(id);
                    let result = await usuarioDAO.updateUsuario(usuario);

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
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para excluir um usuário
async function excluirUsuario(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            // Verifica se o usuário existe
            let resultUsuario = await usuarioDAO.selectAllUsuariosComJogos(id);

            if (resultUsuario) {
                let result = await usuarioDAO.deleteUsuario(id);

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
        console.error(`Erro ao excluir usuário com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}
// Função para listar todos os usuários
async function listarUsuarios() {
    try {
        let dadosUsuarios = {};
        let resultUsuario = await usuarioDAO.selectAllUsuarios();

        if (resultUsuario && typeof resultUsuario === 'object') {
            if (resultUsuario.length > 0) {
                dadosUsuarios.status = true;
                dadosUsuarios.status_code = 200;
                dadosUsuarios.items = resultUsuario.length;
                dadosUsuarios.usuarios = resultUsuario;

                return dadosUsuarios; // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.error(`Erro ao listar usuários:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

// Função para buscar um usuário pelo ID
async function buscarUsuario(id) {
    try {
        if (id == undefined || isNaN(id) || id == null || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS; // 400
        } else {
            let usuario = await usuarioDAO.selectByIdUsuario(id);

            if (usuario) {
                return {
                    status: true,
                    status_code: 200,
                    message: "Usuário encontrado com sucesso.",
                    data: usuario
                };
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        }
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    insertUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuarios,
    buscarUsuario
}