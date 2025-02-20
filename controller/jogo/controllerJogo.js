/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/
//Importa o status
const MESSAGE = require('../../modulo/config.js')
//  Import do DAO para realizar o CRUD no BD
const JogoDAO = require('../../model/DAO/jogo.js')
//Função inserir um novo jogo
const inserirJogo = async function(jogo){
    if(
        jogo.nome == undefined || jogo.nome == '' || jogo.nome == null || jogo.nome.length > 80 ||
        jogo.data_lacamento == undefined || jogo.data_lacamento == '' || jogo.data_lacamento == null || jogo.data_lacamento.length > 10 ||
        jogo.versao == undefined || jogo.versao == '' || jogo.versao == null || jogo.versao.length > 10 ||
        jogo.tamanho == undefined || jogo.tamanho.length > 10 ||
        jogo.descricao == undefined ||
        jogo.foto_capa == undefined || jogo.foto_capa.length > 200 ||
        jogo.link == undefined || jogo.nome.length > 200

    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    }else{
        //encaminha os dados do novo jogo para ser inserido no BD
        let resultJogo = await JogoDAO.insertJogo(jogo)

        if(resultJogo)
            return MESSAGE.SUCCESS_CREATED_ITEM //201
        else
            return MESSAGE.ERROR_INTERNAL_SERVER //500
    }
    
}
async function atualizarJogo(jogo) {
    
}
async function excluirJogo(jogo) {
    
}
async function listarJogo(jogo) {
    
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
    listarJogo,
    buscarJogo
}