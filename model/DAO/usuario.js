/*************************************************************************
Objetivo: Model responsável pelo CRUD de dados referente a usuários no Banco de Dados
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertUsuario(usuario) {
    const { nome, email, senha, tbl_jogo_id } = usuario;

    try {
        // Insere o usuário na tabela tbl_usuario
        let sqlUsuario = `
            INSERT INTO tbl_usuario (nome, email, senha, tbl_jogo_id)
            VALUES ('${nome}', '${email}', '${senha}', ${tbl_jogo_id})
        `;

        console.log('SQL para inserir usuário:', sqlUsuario);

        let resultUsuario = await prisma.$executeRawUnsafe(sqlUsuario);

        console.log('Resultado do SQL:', resultUsuario);

        return resultUsuario ? true : false;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        return false;
    }
}

// Atualizar um usuário
async function updateUsuario(usuario) {
    try {
        let sql = `UPDATE tbl_usuario SET 
                                        nome = '${usuario.nome}',
                                        email = '${usuario.email}',
                                        senha = '${usuario.senha}',
                                        tbl_jogo_id = ${usuario.tbl_jogo_id}
                                        WHERE id_usuario = ${usuario.id_usuario}`;

        console.log('SQL:', sql);

        let result = await prisma.$executeRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${usuario.id_usuario}:`, error);
        return false;
    }
}

// Deletar um usuário
async function deleteUsuario(id) {
    try {
        let sql = `DELETE FROM tbl_usuario WHERE id_usuario = ${id}`;
        console.log('SQL:', sql);

        let result = await prisma.$executeRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao excluir usuário com ID ${id}:`, error);
        return false;
    }
}

// Listar todos os usuários
async function selectAllUsuarios() {
    try {
        let sql = `SELECT 
                        u.id_usuario,
                        u.nome,
                        u.email,
                        u.senha,
                        u.tbl_jogo_id,
                        j.nome AS nome_jogo
                   FROM tbl_usuario u
                   INNER JOIN tbl_jogo j ON u.tbl_jogo_id = j.id
                   ORDER BY u.nome ASC`;

        console.log('SQL:', sql);

        let result = await prisma.$queryRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(`Erro ao listar usuários:`, error);
        return false;
    }
}

// Buscar um usuário pelo ID
async function selectAllUsuariosComJogos(id) {
    try {
        let sql = `
            SELECT 
                id_usuario,
                nome,
                email,
                senha,
                GROUP_CONCAT(j.nome SEPARATOR ', ') AS jogos
            FROM tbl_usuario u
            LEFT JOIN tbl_usuario_jogo uj ON u.id_usuario = uj.id_usuario
            LEFT JOIN tbl_jogo j ON uj.id_jogo = j.id
            WHERE u.id_usuario = ${id} -- Adiciona a condição para buscar por ID
            GROUP BY u.id_usuario
        `;

        console.log('SQL:', sql);

        let result = await prisma.$queryRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result.length > 0 ? result[0] : false; // Retorna apenas o primeiro resultado
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        return false;
    }
}
// Buscar um usuário pelo ID
async function selectByIdUsuario(id) {
    try {
        let sql = `
            SELECT 
                id_usuario,
                nome,
                email,
                senha,
                tbl_jogo_id
            FROM tbl_usuario u
            WHERE id_usuario = ${id}
        `;

        console.log('SQL:', sql);

        let result = await prisma.$queryRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result.length > 0 ? result[0] : false;
    } catch (error) {
        return false;
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectAllUsuariosComJogos,
    selectByIdUsuario
};