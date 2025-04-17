/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a genero no Banco de Dados
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// inseri
async function insertGenero(genero) {
    try {
        let sql = `INSERT INTO tbl_genero (
                                        nome_genero
                                    ) VALUES (
                                        '${genero.nome_genero}'
                                    )`;

        // Executar script no BD
        let result = await prisma.$executeRawUnsafe(sql);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao inserir gênero:`, error); // Adicione log para depuração
        return false;
    }
}
// atualizar
const updateGenero = async function(genero) {
    try {
        let sql = `UPDATE tbl_genero SET 
                    nome_genero = '${genero.nome_genero}'
                   WHERE id_genero = ${genero.id_genero}`;

        let result = await prisma.$executeRawUnsafe(sql);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao atualizar gênero com ID ${genero.id_genero}:`, error); // Log para depuração
        return false;
    }
};
async function deleteGenero(id) {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id_genero = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

      
        return result > 0 ? true : false
    } catch (error) {
        console.error(`Erro ao excluir genero com ID ${id}:`) 
        return false
    }
}
async function selectAllGeneros() {
    try {
        // Substitua 'id' por uma coluna válida, como 'nome_genero'
        let sql = 'SELECT * FROM tbl_genero ORDER BY nome_genero ASC';

        // Executa a consulta no banco de dados
        let result = await prisma.$queryRawUnsafe(sql);

        // Verifica se há resultados
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(`Erro ao listar gêneros:`, error) // Log para depuração
        return false
    }
}
// filtro pelo ID
async function selectByIdGeneros(id) {
    try {
        // Verifique o nome exato da coluna na sua tabela (pode ser id_genero)
        let sql = `SELECT * FROM tbl_genero WHERE id_genero = ${id}`;
        
        // Executa a consulta no banco de dados
        let result = await prisma.$queryRawUnsafe(sql);

        // Verifica se há resultados e retorna o primeiro
        return result.length > 0 ? result[0] : false;
    } catch (error) {
        console.error(`Erro ao buscar gênero com ID ${id}:`, error);
        return false;
    }
}


module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGeneros
}