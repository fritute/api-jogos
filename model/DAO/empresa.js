/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a genero no Banco de Dados
Data: 17/04/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// inseri
async function insertEmpresa(empresa) {
    try {
        console.log('Executando SQL para inserir empresa...');
        let sql = `INSERT INTO tbl_empresa (
                                        nome,
                                        criador_jogo,
                                        tipo,
                                        descricao_empresa
                                    ) VALUES (
                                        '${empresa.nome}',
                                        '${empresa.criador_jogo}',
                                        '${empresa.tipo}',
                                        '${empresa.descricao_empresa}'
                                    )`;

        console.log('SQL:', sql);

        let result = await prisma.$executeRawUnsafe(sql);
        console.log('Resultado do SQL:', result);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao inserir empresa:`, error);
        return false;
    }
}
// atualizar
const updateEmpresa = async function(empresa) {
    try {
        let sql = `UPDATE tbl_empresa SET 
                                        nome = '${empresa.nome}',
                                        criador_jogo = '${empresa.criador_jogo}',
                                        tipo = '${empresa.tipo}',
                                        descricao_empresa = '${empresa.descricao_empresa}'
                                        WHERE id_empresa = ${empresa.id_empresa}`; 

        let result = await prisma.$executeRawUnsafe(sql);

        return result > 0 ? true : false;
    } catch (error) {
        console.error(`Erro ao atualizar gênero com ID ${empresa.id_empresa}:`, error); // Log para depuração
        return false;
    }
};
async function deleteEmpresa(id) {
    try {
        let sql = `DELETE FROM tbl_empresa WHERE id_empresa = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

      
        return result > 0 ? true : false
    } catch (error) {
        console.error(`Erro ao excluir genero com ID ${id}:`) 
        return false
    }
}
async function selectAllEmpresas() {
    try {
        // Substitua 'id' por uma coluna válida, como 'nome_genero'
        let sql = 'SELECT * FROM tbl_empresa ORDER BY nome ASC';

        // Executa a consulta no banco de dados
        let result = await prisma.$queryRawUnsafe(sql);

        // Verifica se há resultados
        return result.length > 0 ? result : false;
    } catch (error) {
        console.error(`Erro ao listar empresa:`, error) // Log para depuração
        return false
    }
}
// filtro pelo ID
async function selectByIdEmpresa(id) {
    try {
        // Verifique o nome exato da coluna na sua tabela (pode ser id_genero)
        let sql = `SELECT * FROM tbl_empresa WHERE id_empresa = ${id}`;
        
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
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectAllEmpresas,
    selectByIdEmpresa
}