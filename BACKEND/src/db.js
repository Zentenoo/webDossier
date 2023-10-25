const {Pool} = require('pg');

const pool =new Pool({
    user:'postgres',
    password:'123aa123',
    host:'localhost',
    port:5432,
    database:'dossier'
})

module.exports=pool;