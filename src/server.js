const express = require('express');
//O require vai retornar uma função, que quando executada retornará um objeto para a var server
const server = express();

//Configurar pastas publicas

server.use(express.static('public'));

//Utilizando uuma template engine

const nunjucks = require('nunjucks');
//Qual pasta estão os htmls, objeto contendo -> servidor, noCache, p/n salvar cache enquanto se desenvolve
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//configurando os caminhos da app

server.get('/', (req, res) => {
    //envia o index html para ser renderizado pelo nunjucks
    return res.render('index.html');
});

server.get('/create-point', (req, res) => {
    
    return res.render('create-point.html');
});

server.get('/search', (req, res) => {
    
    return res.render('search-results.html');
});

//Liga o servidor 
server.listen(3000);