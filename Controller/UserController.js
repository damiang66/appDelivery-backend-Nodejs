const Usuario = require('../modelos/usuarios');
module.exports = {
    registrar(req,res){
        const usuario = req.body; //campos que me envia el cliente
        Usuario.create(usuario,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usario',
                    error:err
                });
            }else{
                return res.status(201).json({
                    success: true,
                    message: 'Se registro un usuario con exito',
                    data:data // el id del nuevo usuario registado
                })
            }
        })
    }
}