const express = require('express');
//O require vai retornar uma função, que quando executada retornará um objeto para a var server
const server = express();

//Peganddo o bd
const db = require('./database/db');
//Configurar pastas publicas

server.use(express.static('public'));

//Habilita o uso do req.body

server.use(express.urlencoded({extended: true}))

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
    //Pega as query strings
    console.log(req.query);
    return res.render('create-point.html');
});

server.post('/savepoint', (req, res) =>{
    //req.body contém oss dados do objeto que será inserido no BD

     //Inserir dados
     const query = `INSERT INTO places(
        name,
        image,
        adress,
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)`

    const values = [
        req.body.name,
        req.body.image,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
        
    ]
    
    //Os valores do segundo argumento irão substituir as interrogações na parte de valores da query
    db.run(query, values, function(err){
        //Se houver erro ele será retornado, essa função é executada APENAS APÓS ser inserido os dados
        if(err){
            console.log(err);
            return res.send('Erro no caddastro!');
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
        //Depois do cadastro, a mesma pagina é renderizada, porém agora com o modal de confirmação
        //A var saved garante isso
        return res.render('create-point.html', {saved: true});
    });

})



server.get('/search', (req, res) => {

    const search = req.query.search;

    if(search == ""){
        return res.render('search-results.html', {total: 0});
    }
    //Vai trazer tudo do BD tds os pontos com nome de cidade parecido (OBS: ${search} entre aspas pra n dar ruim no SQlite)
    db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err, rows){
        if(err){
            console.log(err);
        }
        //console.log('Aqui estão os registros');
        console.log(rows);
        const total = rows.length;
        //Envia os dados
        return res.render('search-results.html', {places: rows, total: total});
    });
    
    
});

//Liga o servidor 
server.listen(3000);