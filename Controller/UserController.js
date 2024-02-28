const Usuario = require('../modelos/usuarios');
const bycrip = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
module.exports = {
    login (req,res){
        const email = req.body.email;
        const password = req.body.password;
        Usuario.findbyEmail(email,async (err,data)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usario',
                    error:err
                });
            }
            if (!data){
                return res.status(401).json({ // el cliente no tiene autorizacion para enviar esta peticion(401)
                    success: false,
                    message: 'El email no fue encontrado',
                 
                });
            }
            console.log("DATOS: "+ JSON.stringify(data));
            console.log('PASSWORD: ' + password);
            console.log('ENCRIPTADO:  '+ data.password);
            const isPasswordValid = await bycrip.compare(password,data.password);
            if (isPasswordValid){
                const token = jwt.sign({id:data.id,email:data.email},keys.secretOrKey,{
                    
                });
                const datos={
                    id: data.id,
                    nombre: data.nombre,
                    apellido:data.apellido,
                    email: data.email,
                    telefono: data.telefono,
                    imagen: data.imagen,
                    session_token :`JWT ${token}`
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado con exito',
                    data:datos // el id del nuevo usuario registado
                }
               )
            }else{
                return res.status(401).json({ // el cliente no tiene autorizacion para enviar esta peticion(401)
                    success: false,
                    message: 'El password es incorrecto',
                 
                });
            }
            
            
        })

    },


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