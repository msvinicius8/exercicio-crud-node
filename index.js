const http = require('http');
const express  = require('express');
const { profile } = require('console');
const bodyParser = require('body-parser');

const app = express();
const porta = 3000;
app.set('port', porta);
app.use(bodyParser.json());

let contador = 2

const produtos = [
    {
        ProdId:1,
        ProdNome:'Régua',
        ProdUnidade: '22',
        prodValorUnit: 4.5
    },
    {
        ProdId:2,
        ProdNome: 'Caderno',
        ProdUnidade: '107',
        prodValorUnit: 20.0
    }

]

app.get("/produtos", (req, res, next) => {
  res.json(produtos);
});

app.post("/produtos", (req, res, next) => {
  const produto = req.body;
  produtos.push({ ProdId: contador += 1, ProdNome: produto.ProdNome, ProdUnidade: produto.ProdUnidade , prodValorUnit: produto.ProdValorUnit});
  res.status(201).send();
});

app.put("/produtos/:ProdId", (req, res, next) => {
  const produtoNovo = req.body;
  const index = produtos.findIndex(p => p.ProdId === parseInt(req.params.ProdId));
  const produtoAntigo = produtos[index];

  produtoAntigo.ProdNome = produtoNovo.ProdNome;
  produtoAntigo.ProdUnidade = produtoNovo.ProdUnidade;
  produtoAntigo.prodValorUnit = produtoNovo.ProdValorUnit;
  
  res.status(201).send();
});

app.delete("/produtos/:ProdId", (req, res, next) => {
  const idParam = req.params.ProdId;
  const index = produtos.findIndex(p => p.ProdId === parseInt(idParam));

  if (index > -1) {
      produtos.splice(index, 1)
      res.json(produtos);
      res.status(200).send();
  }
  
});

const server = http.createServer(app);
server.listen(3000)
