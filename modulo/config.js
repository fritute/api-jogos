/*************************************************************************
Objetivo: arquivo de padronização de mensagens e status code para projeto
Data: 20/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

/******************************MENSAGENS DE ERRO *******************************************/
const ERROR_REQUIRED_FIELDS  =  {status: false, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada !!!"}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: "Não foi possivel processar a requisição, pois ocorreram erros internos no servidor da controller !!!"}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: "Não foi possivel processar a requisição, pois ocorreram erros internos no servidor da  MODEL !!!"}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: "Não foi possivel processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, favor encaminhar apenas JSON!!"}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: "Não foi encontrado itens para retornar!!"}
const ERROR_DELETE_ITEM = {status: false, status_code: 404, message: "Não foi possivel deletar o item, pois não foi encontrado na base de dados!!"}

/******************************MENSAGENS DE ACERTO */
const SUCCESS_CREATED_ITEM   = {status: true, status_code: 201, message: "Item Criado com Sucesso" }
const SUCCESS_DELETED_ITEM   = {status: true, status_code: 200, message: "Item Deletado com Sucesso" }
 const SUCCESS_UPDATED_ITEM = {status: true, status_code: 200, message: "Item Atualizado com Sucesso" }


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_DELETED_ITEM,
    ERROR_DELETE_ITEM,
    SUCCESS_UPDATED_ITEM
}