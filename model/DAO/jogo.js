/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a jogos no Banco de Dados
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// inseri
async function insertJogo(jogo) {
    try {
        let sql = `INSERT INTO tbl_jogo (
                                        nome,
                                        data_lacamento,
                                        versao,
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link                                
                                    ) VALUES (
                                        '${jogo.nome}',
                                        '${jogo.data_lacamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo.descricao}',
                                        '${jogo.foto_capa}',
                                        '${jogo.link}'
                                    )`

        // Executar script no BD
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error(`Erro ao inserir jogo:`, error) // Adicione log para depuração
        return false    
    }
}

// atualizar
const updateJogo = async function(jogo){
    try {
        let sql = `UPDATE tbl_jogo SET 
                                         nome = '${jogo.nome}',
                                        data_lacamento = '${jogo.data_lacamento}',
                                        versao = '${jogo.versao}',
                                        tamanho = '${jogo.tamanho}',
                                        descricao = '${jogo.descricao}',
                                        foto_capa = '${jogo.foto_capa}',
                                        link = '${jogo.link}'
                                        WHERE id = ${jogo.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


// deletar
async function deleteJogo(id) {
    try {
        let sql = `DELETE FROM tbl_jogo WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

      
        return result > 0 ? true : false
    } catch (error) {
        console.error(`Erro ao excluir jogo com ID ${id}:`) 
        return false
    }
}

// select de todos os jogos
async function selectAllJogo (){
try{
    //Script slq para retornar os dados do BD
    let sql = 'select * from tbl_jogo order by id desc'
    //Executa o script SQL e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
        return false
}catch(error){
    return false
}
}

// filtro pelo ID
async function selectByIdJogo (id){
    try {
        let sql = `select * from tbl_jogo where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        if(result.length > 0) 
            return result[0] 
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}