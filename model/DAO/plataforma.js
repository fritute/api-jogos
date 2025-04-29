/*************************************************************************
Objetivo: Model responsável pelo CRUD de dados referente a plataformas no Banco de Dados
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function insertPlataforma(plataforma) {
    try {
        console.log('Executando SQL para inserir plataforma...')
        let sql = `INSERT INTO tbl_plataforma (
                                        nome_plataforma,
                                        descricao
                                    ) VALUES (
                                        '${plataforma.nome_plataforma}',
                                        '${plataforma.descricao}'
                                    )`

        console.log('SQL:', sql)

        let result = await prisma.$executeRawUnsafe(sql)
        console.log('Resultado do SQL:', result)

        return result > 0 ? true : false
    } catch (error) {
        console.error(`Erro ao inserir plataforma:`, error)
        return false
    }
}

async function updatePlataforma(plataforma) {
    try {
        let sql = `UPDATE tbl_plataforma SET 
                                    nome_plataforma = '${plataforma.nome_plataforma}',
                                    descricao = '${plataforma.descricao}'
                                    WHERE id_plataforma = ${plataforma.id_plataforma}`

        console.log('SQL:', sql)

        let result = await prisma.$executeRawUnsafe(sql)
        console.log('Resultado do SQL:', result)

        return result > 0 ? true : false
    } catch (error) {
        console.error(`Erro ao atualizar plataforma com ID ${plataforma.id_plataforma}:`, error)
        return false;
    }
}

// Deletar uma plataforma
async function deletePlataforma(id) {
    try {
        let sql = `DELETE FROM tbl_plataforma WHERE id_plataforma = ${id}`;
        console.log('SQL:', sql);

        let result = await prisma.$executeRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao excluir plataforma com ID ${id}:`, error);
        return false;
    }
}

// Listar todas as plataformas
async function selectAllPlataformas() {
    try {
        let sql = 'SELECT * FROM tbl_plataforma ORDER BY nome_plataforma ASC';
        console.log('SQL:', sql);

        let result = await prisma.$queryRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(`Erro ao listar plataformas:`, error);
        return false;
    }
}

// Buscar uma plataforma pelo ID
async function selectByIdPlataforma(id) {
    try {
        let sql = `SELECT * FROM tbl_plataforma WHERE id_plataforma = ${id}`;
        console.log('SQL:', sql);

        let result = await prisma.$queryRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result.length > 0 ? result[0] : false;
    } catch (error) {
        console.error(`Erro ao buscar plataforma com ID ${id}:`, error);
        return false;
    }
}

module.exports = {
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataformas,
    selectByIdPlataforma
};