var express = require('express');
var app = express();
var compression =require('compression')
var bodyParser = require('body-parser')
var path = require('path')

app.use(compression());
app.use(express.static('src/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/page',(req, res, next) => {
  require('./src/controller/index.js').default(req, res, next)
});

app.get('*', function response(req, res) {
  //if no favicon
  res.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});