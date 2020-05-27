// Create express app
var express = require("express")
var cors = require('cors')
var app = express()

app.use(cors())
var corsOptions = {
    origin: 'http://localhost:7000',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

// Default response for any other request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 7000 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.json({"message":"Ok"})
});

// consultar todos os produtos
app.get("/api/produtos", (req, res, next) => {
    var sql = "select * from produto"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// consultar pelo ID
app.get("/api/produtos/:id", (req, res, next) => {
    var sql = "select * from produto where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


// incluir
app.post("/api/produtos/", (req, res, next) => {
    var errors=[]
    if (!req.body.nome){
        errors.push("Nome não informado");
    }
    if (!req.body.quantidade){
        errors.push("Quantidade não informada");
    }
    if (!req.body.preco){
        errors.push("Preço não informado");
    }
    
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    }

    var sql    = 'INSERT INTO produto (nome, descricao, quantidade, preco) VALUES (?,?,?,?)';
    var params = [data.nome, data.descricao, data.quantidade, data.preco];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// alterar
app.patch("/api/produtos/:id", (req, res, next) => {
    var data = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    }
    db.run(
        `UPDATE produto set 
           nome = COALESCE(?,nome), 
           descricao = COALESCE(?,descricao), 
           quantidade = COALESCE(?,quantidade),
           preco = COALESCE(?,preco)
           WHERE id = ?`,
        [data.nome, data.descricao, data.quantidade, data.preco, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
});


app.delete("/api/produtos/:id", (req, res, next) => {
    db.run(
        'DELETE FROM produto WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
});



// app.use(function(req, res){
//     res.status(404);
// });