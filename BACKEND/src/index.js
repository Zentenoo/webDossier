const express = require('express');
const morgan = require('morgan');
const cors=require('cors')

const platosRoute=require('./routes/plato.route');
const tipoPlato=require('./routes/tipoPlato.route')
const servicio=require('./routes/servicio.route')
const usuarioRoute=require('./routes/usuario.route')
const productoRoute=require('./routes/producto.route')
const servplatoRoute=require('./routes/servplato.route')
const reservaRoute=require('./routes/reserva.route')
const consumoRoute=require('./routes/consumo.route')
const port=3000


const app=express();
app.use(express.json({ limit: '10mb' })); // Aumenta el límite de carga a 10 MB
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use(productoRoute)
app.use(platosRoute)
app.use(tipoPlato)
app.use(servicio)
app.use(usuarioRoute)
app.use(servplatoRoute)
app.use(reservaRoute)
app.use(consumoRoute)

app.use((err,req,res,next)=>{
    return res.json({
        message:err.message
    })
})

app.listen(port)
console.log('Server on port '+port)