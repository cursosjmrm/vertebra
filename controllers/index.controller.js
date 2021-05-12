//aquí irán las funciones
const {Pool} = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: '12345678',
    database: 'vertebra',
    port: 5432
});


const getUsers = (req, res)=>{
    res.send('users');
};

module.exports = {  
    getUsers 
}