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
const inserirJogo = async function(jogo, contentType
){
    try {
        if (contentType == 'application/json') {
            if (
                jogo.nome == undefined || jogo.nome == '' || jogo.nome == null || jogo.nome.length > 80 ||
                jogo.data_lacamento == undefined || jogo.data_lacamento == '' || jogo.data_lacamento == null || jogo.data_lacamento.length > 10 ||
                jogo.versao == undefined || jogo.versao == '' || jogo.versao == null || jogo.versao.length > 10 ||
                jogo.tamanho == undefined || jogo.tamanho.length > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.length > 200 ||
                jogo.link == undefined || jogo.link.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultJogo = await JogoDAO.insertJogo(jogo)

                if (resultJogo)
                    return MESSAGE.SUCCESS_CREATED_ITEM // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(`Erro ao inserir jogo:`, error) // Adicione log para depuração
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
}
async function atualizarJogo(jogo, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                jogo.nome == undefined || jogo.nome == '' || jogo.nome == null || jogo.nome.length > 80 ||
                jogo.data_lacamento == undefined || jogo.data_lacamento == '' || jogo.data_lacamento == null || jogo.data_lacamento.length > 10 ||
                jogo.versao == undefined || jogo.versao == '' || jogo.versao == null || jogo.versao.length > 10 ||
                jogo.tamanho == undefined || jogo.tamanho.length > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.length > 200 ||
                jogo.link == undefined || jogo.link.length > 200 || 
                id == undefined || isNaN(id) || id == null || id == "" || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Verifica se o jogo existe
                let resultJogo = await buscarJogo(parseInt(id))
                if (resultJogo.status_code == 200) {
                    // Atualiza os dados do jogo no BD
                    jogo.id = parseInt(id)
                    let result = await JogoDAO.updateJogo(jogo)

                    if (result)
                        return MESSAGE.SUCCESS_UPDATED_ITEM // 200
                    
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500

                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
async function excluirJogo(id) {
    try {
        let result = await JogoDAO.deleteJogo(id)
        if (id == undefined || isNaN(id) || id == null || id == "" || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }else{
            let result = await JogoDAO.selectByIdJogo(id)
        }
        if (result) {
            return MESSAGE.SUCCESS_DELETED_ITEM // 200
        } else {
            return MESSAGE.ERROR_DELETE_ITEM // 404
        }
    } catch (error) {
        console.error(`Erro ao excluir jogo com ID ${id}:`) 
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
async function listarJogo() {
    try {
        let dadosJogos = {}
        //chama a função para retornar os dados do jogo
    let resultJogo = await JogoDAO.selectAllJogo()

    if(resultJogo != false || typeof(resultJogo)== 'object'){

    //Cria um objeto do tipo JSON para retornar a lista de jogos
    if(resultJogo.length > 0){
        dadosJogos.status = true
        dadosJogos.status_code = 200
        dadosJogos.items = resultJogo.length
        dadosJogos.games = resultJogo

        return dadosJogos //200
    }else{
        return MESSAGE.ERROR_NOT_FOUND //404

    }
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
    }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

    
}
async function buscarJogo(id) {
    try {
        if(id == undefined || isNaN(id) || id == null || id == "" || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS 
            
        }else{

        let dadosJogo = {}
        let jogo = await JogoDAO.selectByIdJogo(parseInt(id)) 

        if (jogo) {
            dadosJogo.status = true
            dadosJogo.status_code = 200
            dadosJogo.jogo = jogo

            return dadosJogo
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
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