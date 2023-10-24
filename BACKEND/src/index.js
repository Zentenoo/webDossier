const express = require('express');
const morgan = require('morgan');

const platosRoute=require('./routes/platos.route');

const port=3000


const app=express();
app.use(morgan('dev'))
app.use(express.json());

app.use(platosRoute)

app.listen(port)
console.log('Server on port '+port)