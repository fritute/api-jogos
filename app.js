/*************************************************************************
Objetiv: API  referente ao projeto de controle
Data: 13/02/2025
Autor: Gustavo Zumba
Versão: 1.0
* Observação:
**********  Para configura e instalar a API, precisamos das 
            seguintes bibliotecas:
                express         npm install express --save 

                cors            npm install cors --save 

                body-parser     npm install body-parser --save   
**********  Para configura e instalar o acesso ao Banco de dados, 
            precisamos:
                prisma          npm install prisma --save (conexão com o BD)

                prisma/client   npm install @prisma/client --save   (Executa scripts no BD)

**** Após a instalação do prisma e do prisma client, devemos:
    npx prisma init (Inicializar o prisma no projeto

    Para realizar o sincronismo do prisma com o banco de dados ,devemos executar o seguinte comando:
    npx prisma migrate dev
************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
//Import das controller para realizar o crud de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo o formato de dados que devera chegar no body na requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria objeto app para criar a API
const app = express()

app.use((request,response,next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())
    next()
})
//EndPoint para inserir um jogo no BD 
app.post('/v1/controle-jogos/jogo',cors(), bodyParserJSON, async function(request,response) {
    //recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    
})

 //chama a função para listar os jogos
 app.get('/v1/controle-jogos/jogo' , cors(), async function(request, response) {
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
    
})

app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})