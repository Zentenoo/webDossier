const {Pool} = require('pg');

const pool =new Pool({
    user:'postgres',
    password:'udilab',
    host:'localhost',
    port:5432,
    database:'dossier'
})

module.exports=pool;