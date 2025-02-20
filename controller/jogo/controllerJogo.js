/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/


async function inserirJogo(jogo) {
    if(
        corrigirNotNullVarchar(jogo.nome, 80) ||
        corrigirNotNullVarchar(jogo.data_lacamento, 10) ||
        corrigirNotNullVarchar(jogo.versao, 10) ||
        corrigirVarchar(jogo.tamanho, 10) ||
        corrigirUndefined(jogo.descricao) ||
        corrigirVarchar(jogo.foto_capa, 200) ||
        corrigirVarchar(jogo.link, 200)
    ){

    }
    
}
async function atualizarJogo(jogo) {
    
}
async function excluirJogo(jogo) {
    
}
async function listarTodosJogo(jogo) {
    
}
async function buscarJogo(jogo) {
    
}

function corrigirNotNullVarchar(text, letras){
    if(text == undefined || text == "" || text == null || text.length > letras){
        return false
    }else{
        return true
    }
}

function corrigirVarchar(text, letras){
    if(text == undefined || text.length > letras){
        return false
    }else{
        return true
    }
}
function corrigirUndefined(text){
    if(text == undefined){
        return false
    }else{
        return true
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarTodosJogo,
    buscarJogo
}