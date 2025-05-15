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
const controllerPlataforma = require('./controller/plataforma/controllerPlataforma.js');
const controllerUsuario = require('./controller/usuario/controllerUsuario.js');
const controllerJogoGenero = require('./controller/jogo_genero/controllerJogoGenero.js');
const controllerAvaliacao = require('./controller/avaliacao/controllerAvaliacao.js');
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
//listarGenero
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

    let resultEmpresa = await controllerEmpresa.excluirEmpresa(id)

    // Verifica se o resultado possui um status_code válido
    if (resultEmpresa && resultEmpresa.status_code) {
        response.status(resultEmpresa.status_code).json(resultEmpresa)
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Empresa não encontrada."
        })
    }
})

//Plataforma
// Inserir uma nova plataforma
app.post('/v1/controle-jogos/plataforma', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    let plataforma = request.body;

    console.log('Dados recebidos no endpoint:', plataforma);

    // Chama a função para inserir a plataforma
    try {
        let resultPlataforma = await controllerPlataforma.insertPlataforma(plataforma, contentType);

        // Verifica se o resultado possui um status_code válido
        if (resultPlataforma && resultPlataforma.status_code) {
            response.status(resultPlataforma.status_code).json(resultPlataforma);
        } else {
            // Retorna um erro genérico caso o status_code esteja indefinido
            response.status(500).json({
                status: false,
                status_code: 500,
                message: "Erro interno no servidor ao processar a requisição.",
            });
        }
    } catch (error) {
        console.error('Erro ao inserir plataforma:', error);
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição."
        });
    }
});

// Listar todas as plataformas
app.get('/v1/controle-jogos/plataformas', cors(), async function (request, response) {
    let resultPlataforma = await controllerPlataforma.listarPlataformas();

    // Verifica se o resultado possui um status_code válido
    if (resultPlataforma && resultPlataforma.status_code) {
        response.status(resultPlataforma.status_code).json(resultPlataforma);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        });
    }
});

// Buscar uma plataforma pelo ID
app.get('/v1/controle-jogos/plataforma/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id) || id <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID inválido. Deve ser um número positivo."
        });
    }

    let resultPlataforma = await controllerPlataforma.buscarPlataforma(id);

    // Verifica se o resultado possui um status_code válido
    if (resultPlataforma && resultPlataforma.status_code) {
        response.status(resultPlataforma.status_code).json(resultPlataforma);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Plataforma não encontrada."
        });
    }
});

// Atualizar uma plataforma pelo ID
app.put('/v1/controle-jogos/AtualizarPlataforma/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    // Recebe o id da plataforma
    let idPlataforma = parseInt(request.params.id);
    // Recebe os dados da plataforma encaminhado no body da requisição
    let dadosBody = request.body;

    // Validação para garantir que o ID é um número
    if (isNaN(idPlataforma)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    try {
        let resultPlataforma = await controllerPlataforma.atualizarPlataforma(dadosBody, idPlataforma, contentType);
        response.status(resultPlataforma.status_code).json(resultPlataforma);
    } catch (error) {
        console.error(`Erro ao atualizar plataforma com ID ${idPlataforma}:`, error);
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição."
        });
    }
});
// Deletar uma plataforma pelo ID
app.delete('/v1/controle-jogos/plataforma/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    let resultPlataforma = await controllerPlataforma.excluirPlataforma(id);

    // Verifica se o resultado possui um status_code válido
    if (resultPlataforma && resultPlataforma.status_code) {
        response.status(resultPlataforma.status_code).json(resultPlataforma);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Plataforma não encontrada."
        })
    }
})

//Usuario
// Inserir um novo usuário
app.post('/v1/controle-jogos/usuario', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    let usuario = request.body;

    console.log('Dados recebidos no endpoint:', usuario);

    // Chama a função para inserir o usuário
    try {
        let resultUsuario = await controllerUsuario.insertUsuario(usuario, contentType);

        // Verifica se o resultado possui um status_code válido
        if (resultUsuario && resultUsuario.status_code) {
            response.status(resultUsuario.status_code).json(resultUsuario);
        } else {
            // Retorna um erro genérico caso o status_code esteja indefinido
            response.status(500).json({
                status: false,
                status_code: 500,
                message: "Erro interno no servidor ao processar a requisição.",
            });
        }
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição."
        })
    }
})
// Listar todos os usuários
app.get('/v1/controle-jogos/usuarios', cors(), async function (request, response) {
    let resultUsuario = await controllerUsuario.listarUsuarios();

    // Verifica se o resultado possui um status_code válido
    if (resultUsuario && resultUsuario.status_code) {
        response.status(resultUsuario.status_code).json(resultUsuario);
    } else {
        // Retorna um erro genérico caso o status_code esteja indefinido
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição.",
        });
    }
});

// Buscar um usuário pelo ID
app.get('/v1/controle-jogos/usuario/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id) || id <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID inválido. Deve ser um número positivo."
        });
    }

    let resultUsuario = await controllerUsuario.buscarUsuario(id);

    // Verifica se o resultado possui um status_code válido
    if (resultUsuario && resultUsuario.status_code) {
        response.status(resultUsuario.status_code).json(resultUsuario);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Usuário não encontrado."
        })
    }
})

// Atualizar um usuário pelo ID
app.put('/v1/controle-jogos/usuarioAtualizar/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type'];
    // Recebe o id do usuário
    let idUsuario = parseInt(request.params.id);
    // Recebe os dados do usuário encaminhado no body da requisição
    let dadosBody = request.body;

    // Validação para garantir que o ID é um número
    if (isNaN(idUsuario)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    try {
        let resultUsuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType);
        response.status(resultUsuario.status_code).json(resultUsuario);
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${idUsuario}:`, error);
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição."
        })
    }
})

// Deletar um usuário pelo ID
app.delete('/v1/controle-jogos/usuarioDeletar/:id', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    // Validação para garantir que o ID é um número válido
    if (isNaN(id)) {
        return response.status(400).json({ status: false, status_code: 400, message: "ID inválido. Deve ser um número." });
    }

    let resultUsuario = await controllerUsuario.excluirUsuario(id);

    // Verifica se o resultado possui um status_code válido
    if (resultUsuario && resultUsuario.status_code) {
        response.status(resultUsuario.status_code).json(resultUsuario);
    } else {
        response.status(404).json({
            status: false,
            status_code: 404,
            message: "Usuário não encontrado."
        })
    }
})

// Inserir um relacionamento entre jogo e gênero
app.post('/v1/controle-jogos/jogo-genero', cors(), bodyParserJSON, async function (request, response) {
    const { id, id_categoria } = request.body;

    if (!id || isNaN(id) || id <= 0 || !id_categoria || isNaN(id_categoria) || id_categoria <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "IDs inválidos. Ambos devem ser números positivos."
        });
    }

    let result = await controllerJogoGenero.insertJogoGenero(id, id_categoria);

    response.status(result.status_code).json(result);
});

// Deletar um relacionamento entre jogo e gênero
app.delete('/v1/controle-jogos/jogo-genero', cors(), bodyParserJSON, async function (request, response) {
    const { id, id_categoria } = request.body;

    if (!id || isNaN(id) || id <= 0 || !id_categoria || isNaN(id_categoria) || id_categoria <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "IDs inválidos. Ambos devem ser números positivos."
        });
    }

    let result = await controllerJogoGenero.deleteJogoGenero(id, id_categoria);

    response.status(result.status_code).json(result);
});

// Listar todos os gêneros de um jogo
app.get('/v1/controle-jogos/jogo/:id/generos', cors(), async function (request, response) {
    const id = parseInt(request.params.id);

    if (isNaN(id) || id <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID do jogo inválido. Deve ser um número positivo."
        });
    }

    let result = await controllerJogoGenero.listarGenerosPorJogo(id);

    response.status(result.status_code).json(result);
});

// Listar todos os jogos de um gênero
app.get('/v1/controle-jogos/genero/:id/jogos', cors(), async function (request, response) {
    const id_categoria = parseInt(request.params.id);

    if (isNaN(id_categoria) || id_categoria <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID do gênero inválido. Deve ser um número positivo."
        });
    }

    let result = await controllerJogoGenero.listarJogosPorGenero(id_categoria);

    response.status(result.status_code).json(result);
});

// Atualizar um relacionamento entre jogo e gênero
app.put('/v1/controle-jogos/jogo-genero', cors(), bodyParserJSON, async function (request, response) {
    const { idAntigo, idCategoriaAntiga, idNovo, idCategoriaNova } = request.body;

    if (
        !idAntigo || isNaN(idAntigo) || idAntigo <= 0 ||
        !idCategoriaAntiga || isNaN(idCategoriaAntiga) || idCategoriaAntiga <= 0 ||
        !idNovo || isNaN(idNovo) || idNovo <= 0 ||
        !idCategoriaNova || isNaN(idCategoriaNova) || idCategoriaNova <= 0
    ) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "IDs inválidos. Todos devem ser números positivos."
        });
    }

    let result = await controllerJogoGenero.atualizarJogoGenero(idAntigo, idCategoriaAntiga, idNovo, idCategoriaNova);

    response.status(result.status_code).json(result);
});





//avaliacao





// Inserir uma avaliação
app.post('/v1/controle-jogos/avaliacao', cors(), bodyParserJSON, async function (request, response) {
    try {
        const { comentario, pontuacao, id_jogo } = request.body;

        // Validação dos campos obrigatórios
        if (!comentario || typeof comentario !== 'string' || comentario.trim() === '') {
            return response.status(400).json({
                status: false,
                status_code: 400,
                message: "O campo 'comentario' é obrigatório e deve ser uma string válida."
            });
        }

        if (!pontuacao || isNaN(pontuacao) || pontuacao <= 0 || pontuacao > 10) {
            return response.status(400).json({
                status: false,
                status_code: 400,
                message: "O campo 'pontuacao' é obrigatório e deve ser um número entre 1 e 10."
            });
        }

        if (!id_jogo || isNaN(id_jogo) || id_jogo <= 0) {
            return response.status(400).json({
                status: false,
                status_code: 400,
                message: "O campo 'id_jogo' é obrigatório e deve ser um número positivo."
            });
        }

        // Chama a controller para inserir a avaliação
        let result = await controllerAvaliacao.inserirAvaliacao(comentario, pontuacao, id_jogo);

        // Retorna a resposta da controller
        response.status(result.status_code).json(result);
    } catch (error) {
        console.error('Erro ao inserir avaliação:', error);
        response.status(500).json({
            status: false,
            status_code: 500,
            message: "Erro interno no servidor ao processar a requisição."
        });
    }
})

// Atualizar uma avaliação
app.put('/v1/controle-jogos/avaliacao/:id', cors(), bodyParserJSON, async function (request, response) {
    const id_avaliacao = parseInt(request.params.id);
    const { comentario, pontuacao, id_jogo } = request.body;

    if (!id_avaliacao || isNaN(id_avaliacao) || id_avaliacao <= 0 || !comentario || !pontuacao || !id_jogo || isNaN(pontuacao) || isNaN(id_jogo) || pontuacao <= 0 || id_jogo <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "Campos obrigatórios inválidos. Verifique os dados enviados."
        });
    }

    let result = await controllerAvaliacao.atualizarAvaliacao(id_avaliacao, comentario, pontuacao, id_jogo);

    response.status(result.status_code).json(result);
});

// Deletar uma avaliação
app.delete('/v1/controle-jogos/avaliacao/:id', cors(), async function (request, response) {
    const id_avaliacao = parseInt(request.params.id);

    if (!id_avaliacao || isNaN(id_avaliacao) || id_avaliacao <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID da avaliação inválido. Deve ser um número positivo."
        });
    }

    let result = await controllerAvaliacao.deletarAvaliacao(id_avaliacao);

    response.status(result.status_code).json(result);
});

// Listar todas as avaliações de um jogo
app.get('/v1/controle-jogos/jogo/:id/avaliacoes', cors(), async function (request, response) {
    const id_jogo = parseInt(request.params.id);

    if (!id_jogo || isNaN(id_jogo) || id_jogo <= 0) {
        return response.status(400).json({
            status: false,
            status_code: 400,
            message: "ID do jogo inválido. Deve ser um número positivo."
        });
    }

    let result = await controllerAvaliacao.listarAvaliacoesPorJogo(id_jogo);

    response.status(result.status_code).json(result);
});

// Listar todas as avaliações
app.get('/v1/controle-jogos/avaliacoes', cors(), async function (request, response) {
    let result = await controllerAvaliacao.listarTodasAvaliacoes();

    response.status(result.status_code).json(result);
});

