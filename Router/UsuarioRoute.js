const usuarioController = require('../Controller/UserController')
module.exports = (app)=>{
    
    app.post('/api/usuario/crear',usuarioController.registrar)
    app.post('/api/usuario/login',usuarioController.login)
}