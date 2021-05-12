const express = require('express');
const Book = require('../models/Book'); //Cuando se importan archivos creados por nosotros deben importarse debajo de las librerias
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/book/create', (req, res) => {
    //Escribimos una estructuración que recibe los datos desde req.body 
    //normalmente los datos en los métods patch, post o put se obtienen de req.body
    let { title, pages, year, isbn, author } = req.body;
    // cada vez qeu se requiere modificar algo se deben enviar los datos por el cuerpo
    //console.log(title, pages, year, isbn, author);
    let book = new Book(title, pages, year, isbn, author); // creamos el objeto a través de una variable instanciada
    let created = book.create(book); //se llama al método create, usando el nombre.método y le enviamos el libro
    res.json({ status: true, message: created }); //Postman se quedaba pensando a falta de la respuesta
});

//Crear el endopoint listar los libros
app.get('/book/list', (req, res) => {
    let book = new Book();
    let listBooks = book.find();
    res.json({ status: true, listBooks: listBooks })
});
//Crear el endopoint para buscar por isbn
app.get('/book/:isbn', (req, res) => {  //:isbn significa que recibirá un parámetro con el nombre isbn
    let isbn = req.params.isbn;
    let book = new Book();
    let bookByISBN = book.findISBN(isbn)
    res.json({ status: true, book: bookByISBN });
});

app.delete('/book/delete/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    let book = new Book();
    let message = book.delete(isbn);
    res.json({ status: true, message });

});

app.put('/book/update/:isbn',(req, res)=>{ //No se pone :isbn para forzar a recibirlo en el body
    let {title, pages, year, author} = req.body;
    let isbn = req.params.isbn;
    let book = new Book (title, pages, year, isbn, author);
    let message = book.update(isbn, book);
    //console.log(book);
    res.json({status: true, message});

});

module.exports = app;