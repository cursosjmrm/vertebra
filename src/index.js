const express = require('express');
const app = express();
const routes = require('../routes/index');

//midlewares funciones que se ejecutan antes de que lleguen a las rutas
app.use(express.json()); // utilizar  método json de express, que hace que cada vez que al server envíen
//info en formato json lo entiende y convierte a js para manipularlo en el código
app.use(express.urlencoded({extended: false}));

app.use(routes);
//app.use(require('../routes/index'));

app.listen(3000);
console.log('Server corriendo en http://localhost:3000');