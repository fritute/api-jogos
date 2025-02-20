/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a jogos no Banco de Dados
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')

// inseri
async function insertJogo (jogo){
    const prisma = new PrismaClient()

    let sql = `insert into tbl_jogo (
                                        nome,
                                        data_lancamento,
                                        versao,
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link                                
                                    ) values (
                                        ${jogo.nome},
                                        ${jogo.data_lancamento},
                                        ${jogo.versao},
                                        ${jogo.tamanho},
                                        ${jogo.descricao},
                                        ${jogo.foto_capa},
                                        ${jogo.link} 
                                    )`

    //executar script no BD
    
    let result = await prisma.$executeRawUnsafe(sql)

    return result ? true : false
}

// atualizar
async function updateJogo (){

}

// deletar
async function deleteJogo (){

}

// select de todos os jogos
async function selectAllJogo (){

}

// filtro pelo ID
async function selectByIdJogo (){

}

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}