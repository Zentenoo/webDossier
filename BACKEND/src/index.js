const express = require('express');
const morgan = require('morgan');
const cors=require('cors')

const platosRoute=require('./routes/plato.route');
const tipoPlato=require('./routes/tipoPlato.route')
const servicio=require('./routes/servicio.route')
const usuarioRoute=require('./routes/usuario.route')

const port=3000


const app=express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use(platosRoute)
app.use(tipoPlato)
app.use(servicio)
app.use(usuarioRoute)

app.use((err,req,res,next)=>{
    return res.json({
        message:err.message
    })
})

app.listen(port)
console.log('Server on port '+port)