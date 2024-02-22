const express = require('express');
const app = express();
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

/**
 * Importamos las rutas
 */
const usuariosRutas = require('./Router/UsuarioRoute')



const server = http.createServer(app);
const port =  process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({
    extended:true,
}));
app.use(cors());
app.disable('x-powered-by');
app.set('port',port);

/**
 * llamamos a las rutas
 */
usuariosRutas(app);

server.listen(3000,'192.168.56.1' || 'localhost',function(){
    console.log('aplicacion de node ' +  process.pid + ' en el puerto ' + port +  ' iniciando...');
})
// rutas
app.get('/',(req,res)=>{
    res.send('ruta raiz del backend')
})
app.get('/test',(req,res)=>{
    res.send('ruta para test')
})

// error
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});