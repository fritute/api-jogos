/*************************************************************************
Objetivo: arquivo de padronização de mensagens e status code para projeto
Data: 20/02/2025
Autor: Gustavo Zumba
Versão: 1.0
************************************************************************/

/******************************MENSAGENS DE ERRO *******************************************/
const ERROR_REQUIRED_FIELDS  =  {status: false, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada !!!"}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: "Não foi possivel processar a requisição, pois ocorreram erros internos no servidor !!!"}



/******************************MENSAGENS DE ACERTO */
const SUCCESS_CREATED_ITEM   = {status: true, status_code: 201, message: "Item Criado com Sucesso" }




module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER
}