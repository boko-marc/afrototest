const express = require('express');
bodyParser = require('body-parser'),
  cors = require('cors');
  var morgan = require('morgan')

// serveur
const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
// middleware  cors origin 
var corsOptions = {
  "origin": "*" ,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  'allowedHeaders': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  'credentials' : true,
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: "Afroto test API" })
})
module.exports = app;
