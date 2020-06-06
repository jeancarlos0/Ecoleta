//Verbose produz stack traces mais detalhados
const sqlite3 = require('sqlite3').verbose();
//Cria o objeto que vai manipular o BD
const db = new sqlite3.Database('./src/database/database.db');
//Dá acesso ao db a outras partes da aplicação
module.exports = db

//Manipula o BD
//Serialize executa uma série de coisas...
/*
db.serialize(()=>{
    //Criar tabela 
    //Cria a tabela caso n exista e insere as colunas definidas por argumento
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            adress TEXT,
            adress2 TEXT, 
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);
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
        "Colectoria",
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Guilherme Genbalha, Jardim America",
        "Número 220",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e papelão"
    ]
    //Os valores do segundo argumento irão substituir as interrogações na parte de valores da query
    db.run(query, values, function(err){
        //Se houver erro ele será retornado, essa função é executada APENAS APÓS ser inserido os dados
        if(err){
            return console.log(err);
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    });

    //Consultar dados
    //Seleciona tudo na tabela places
    //Rows são os registros da tabela
    db.all(`SELECT name FROM places`, function(err, rows){
        if(err){
            console.log(err);
        }
        console.log('Aqui estão os registros');
        console.log(rows);

    });

    //Deletar dados
    //Vai deletar o item com ID igual a um
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
        if(err){
            console.log(err);
        }
        console.log('Registro deletado com sucesso');

    });
    
});
*/