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
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerEmpresa = require('./controller/empresa/controllerEmpresa.js')

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
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    let jogo = request.body

    let resultJogo = await controllerJogo.inserirJogo(jogo, contentType)
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

 //chama a função para listar os jogos
 app.get('/v1/controle-jogos/jogo' , cors(), async function(request, response) {
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
    
})
app.get('/v1/controle-jogos/jogo/:id', cors(), async function(request, response) {
    const id = parseInt(request.params.id)
    let resultJogo = await controllerJogo.buscarJogo(id)
    response.json(resultJogo)
})
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function(request, response) {
    const id = parseInt(request.params.id)

    if (isNaN(id)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." })
    }

    let resultJogo = await controllerJogo.excluirJogo(id)
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})
app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    // Recebe o id do jogo
    let idJogo = parseInt(request.params.id)
    // Recebe os dados do jogo encaminhado do body da requisição
    let dadosBody = request.body

    // Validação para garantir que o ID é um número
    if (isNaN(idJogo)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." })
    }

    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})

//tbl_genero
// EndPoint para inserir um gênero no BD
app.post('/v1/controle-jogos/genero', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    let genero = request.body;

    // Chama a função para inserir o gênero
    let resultGenero = await controllerGenero.insertGenero(genero, contentType);

    // Verifica se o resultado possui um status_code válido
    if (resultGenero && resultGenero.status_code) {
        response.status(resultGenero.status_code).json(resultGenero);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        })
    }
})
//atualizar genero
app.get('/v1/controle-jogos/listaGeneros', cors(), async function (request, response) {
    let resultGenero = await controllerGenero.listarGenero();

    // Verifica se o resultado possui um status_code válido
    if (resultGenero && resultGenero.status_code) {
        response.status(resultGenero.status_code).json(resultGenero);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        })
    }
})
//bucar genero pelo id
app.get('/v1/controle-jogos/listarGenero/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    if (isNaN(id) || id <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID inválido. Deve ser um número positivo."
        });
    }

    let resultGenero = await controllerGenero.buscarGenero(id);
    
    if (resultGenero.status_code) {
        response.status(resultGenero.status_code).json(resultGenero);
    } else {
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor."
        })
    }
})
//deletar genero
app.delete('/v1/controle-jogos/DeletarGenero/:id', cors(), async function(request, response) {
    const id = parseInt(request.params.id)

    if (isNaN(id)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." })
    }

    let resultGenero = await controllerGenero.excluirGenero(id)
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//atualizar genero
app.put('/v1/controle-jogos/AtualizarGenero/:id', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    // Recebe o id do gênero
    let idGenero = parseInt(request.params.id);
    // Recebe os dados do gênero encaminhado no body da requisição
    let dadosBody = request.body;

    // Validação para garantir que o ID é um número
    if (isNaN(idGenero)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    let resultGenero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType);
    response.status(resultGenero.status_code).json(resultGenero);
});

// Inserir uma nova empresa
app.post('/v1/controle-jogos/empresa', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    let empresa = request.body;

    console.log('Dados recebidos no endpoint:', empresa);

    // Chama a função para inserir a empresa
    let resultEmpresa = await controllerEmpresa.insertEmpresa(empresa, contentType);

    // Verifica se o resultado possui um status_code válido
    if (resultEmpresa && resultEmpresa.status_code) {
        response.status(resultEmpresa.status_code).json(resultEmpresa);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        });
    }
});

// Listar todas as empresas
app.get('/v1/controle-jogos/empresas', cors(), async function (request, response) {
    let resultEmpresa = await controllerEmpresa.listarEmpresa();

    // Verifica se o resultado possui um status_code válido
    if (resultEmpresa && resultEmpresa.status_code) {
        response.status(resultEmpresa.status_code).json(resultEmpresa);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        });
    }
});

// Buscar uma empresa pelo ID
app.get('/v1/controle-jogos/empresa/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id) || id <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID inválido. Deve ser um número positivo."
        });
    }

    let resultEmpresa = await controllerEmpresa.buscarEmpresa(id);

    // Verifica se o resultado possui um status_code válido
    if (resultEmpresa && resultEmpresa.status_code) {
        response.status(resultEmpresa.status_code).json(resultEmpresa);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Empresa não encontrada."
        });
    }
});

// Atualizar uma empresa pelo ID
app.put('/v1/controle-jogos/empresa/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    // Recebe o id da empresa
    let idEmpresa = parseInt(request.params.id);
    // Recebe os dados da empresa encaminhado no body da requisição
    let dadosBody = request.body;

    // Validação para garantir que o ID é um número
    if (isNaN(idEmpresa)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    let resultEmpresa = await controllerEmpresa.atualizarEmpresa(dadosBody, idEmpresa, contentType);
    response.status(resultEmpresa.status_code).json(resultEmpresa);
});

// Deletar uma empresa pelo ID
app.delete('/v1/controle-jogos/empresa/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    let resultEmpresa = await controllerEmpresa.excluirEmpresa(id);

    // Verifica se o resultado possui um status_code válido
    if (resultEmpresa && resultEmpresa.status_code) {
        response.status(resultEmpresa.status_code).json(resultEmpresa);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Empresa não encontrada."
        });
    }
});