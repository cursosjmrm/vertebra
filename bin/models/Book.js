//el nombre del archivo va con "B" porque es una clase
const { json } = require('express');
const fs = require('fs');
let listBooks = [];

class Book { //Se crea la clase book con estas propiedades
    constructor(title, pages, year, isbn, author) {
        this.title = title;
        this.pages = pages;
        this.year = year;
        this.isbn = isbn;
        this.author = author;
    }

    create(book){ //se crea un método llamado create recibe como parametro book
        // le indicamos a filesystem al ruta donde queremos guardar el archivo pero usando asíncrono seguido de
        // la data que debe guardar enviando un JSON.stringify que convierte el json en string
        this.find(); //Valida si existe algo y lo mantiene

        listBooks.push(book);


        this.write();
        return 'Book saved'; // confirma que ya fue guardado
    }
    find(){

        let exists = fs.existsSync('./storage/book.json'); // valida si existe el libro y devuelve bool

        if(exists){
            listBooks = JSON.parse(fs.readFileSync('./storage/book.json')); //si existe pedimos leerlo en formato json
        }
        return listBooks; //imprime el contenido extraído con el formato json en línea 27
    }

    findISBN (isbn){

        let position = this.findIntoList(isbn);

        return listBooks[position];
    }

    findIntoList(isbn){

        this.find();
        
        let position = listBooks.findIndex((e)=>e.isbn===isbn);
        if(position === -1){
            throw new Error ('Book not found');
        }

        return position;
    }

    delete(isbn){

        let position = this.findIntoList(isbn);
        //splice es un método para modificar o eliminar elementos de un arreglo y el 1 es la cantidad de elementos
        listBooks.splice(position, 1); 
        this.write();
        //console.log(listBooks);
        return 'Book deleted';
    }

    update(isbn, book){

        let position = this.findIntoList(isbn);

        let keys = Object.keys(book); // esto es para traer las propiedades del objeto e iterarlas

        keys.forEach((e)=>{
            if (book[e]!==undefined){
                listBooks[position][e] = book[e];
                // es lo mismo que tener listBooks[1][pages] = book[pages] solo que iterado
            }
        });
        
        this.write();

        return 'Book updated!';
    }

    write(){
        
        //fs.writeFileSync('./storage/book.json',JSON.stringify(book)); Al dejar esto sólo escribe un libro
        fs.writeFile('./storage/book.json',JSON.stringify(listBooks), (err)=>{
        // se hace así para que incluya toda la lista    
            if(err){
                throw new Error('Book not saved');
            }
        }); 
    }


} //luego enel index se crea una ruta post para ser accedida desde esta clase 

//luego se debe exportar la clase Book

module.exports = Book;