var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text, 
            descricao text, 
            quantidade integer,
            preco  decimal(10,2),
            CONSTRAINT uniq_produto_nome UNIQUE (nome)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO produto (nome, descricao, quantidade, preco) VALUES (?,?,?,?)'
                db.run(insert, ["Mouse","Mouse sem fio", 10, 33.99])
                db.run(insert, ["Teclado","Teclado sem fio", 21, 29.99])
            }
        });  
    }
});

module.exports = db