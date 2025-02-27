/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a jogos no Banco de Dados
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// inseri
async function insertJogo (jogo){
    try{

   
 

    let sql = `insert into tbl_jogo (
                                        nome,
                                        data_lacamento,
                                        versao,
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link                                
                                    ) values (
                                        '${jogo.nome}',
                                        '${jogo.data_lacamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo.descricao}',
                                        '${jogo.foto_capa}',
                                        '${jogo.link}'
                                    )`

    //executar script no BD
    
    let result = await prisma.$executeRawUnsafe(sql)

    return result ? true : false
}catch (error){
    return false    
}
}

// atualizar
async function updateJogo (){

}

// deletar
async function deleteJogo (){

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
async function selectByIdJogo (){

}

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}