const express = require('express');
const bodyparser = require('body-parser'); //body parser se usa para recibir json a través de los request
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./bin/routes/books');

const app = express(); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
// le dice a expresrs que en la ruta api-docs vamos a servir a swagger y que la forma en que va a servir
//es gracias al documento swagger.json donde se almacenará la configuración


app.use(bodyparser.json());
app.use('/api/v1', routes);

module.exports = app;