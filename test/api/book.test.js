const request = require('supertest'); //SUpertet permite realizar peticiones HTTP
const app = require('../../app');
const { get } = require('../../bin/routes/books');


describe('Book',()=>{
    let server;
    const port = 3000;
    const book = {
        title: 'El moro',
        pages: 32,
        year: 1987,
        isbn: '123-456-789-123-X1',
        author: 'José Manuel Marroquin'
    };

    beforeAll((done)=>{
        server = app.listen(port);
        done();
    });//Función de jest para que esto se ejecute antes de todos los test

    afterAll((done)=>{ //Se ejecuta después de todos los test
        server.close();
        done();
    });

    test ('Should get all books',async (done)=>{
        const res = await request(server)
            .get('/api/v1/book/list');
        
    //    console.log(res.statusCode);
    //    console.log(res.body);
        expect(res.statusCode).toBe(200);
        /*expect(res.body).toContains({
            title: "Cien años de soledad",
            pages: 402,
            year: 1962,
            isbn: "123-456-7890-A1",
            author: "Gabriel García Márquez"

        });*/
        expect(res.body).toEqual(expect.objectContaining({listBooks: expect.any(Array)}));
        done();
    });

    test('Should create a book and return a message', async (done)=>{
        const res = await request (server)
            .post('/api/v1/book/create')
            .send(book);
        
        expect (res.statusCode).toEqual(200);
        expect (res.body).toEqual({status: true, message: 'Book saved'});
        done();
    });

    test('Should get a book by ISBN', async (done)=>{
        const res = await request(server)
            .get(`/api/v1/book/${book.isbn}`);

        expect (res.statusCode).toEqual(200);
        expect(res.body).toEqual({status: true, book});

        done();
    });

    test('Should update a book and return a meesage', async (done)=>{
        const res = await request(server)
            .put(`/api/v1/book/update/${book.isbn}`)
            .send({
                title: 'El morado',
                isbn: book.isbn
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status: true, message: 'Book updated!'});
        done();

    }); 

   test ('Should delete a book and return a message', async (done)=>{
        const res = await request(server)
            .delete(`/api/v1/book/delete/${book.isbn}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({status: true, message: 'Book deleted'});

        done();
    });
    
});