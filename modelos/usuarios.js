const db = require("../config/config");
const bcrypt = require('bcryptjs')
const Usuario = {}
Usuario.findbyid = (id,result)=>{
    const sql = `
    SELECT 
    id,
    email,
    nombre,
    apellido,
    telefono,
    imagen,
    password
    FROM usuarios
    WHERE
    id = ?

    `
    db.query(
        sql,
        [id], (err,res)=>{
            if (err){
                console.log('Error' ,err);
                result(err,null)
            }else{
                console.log('Usuario obtenido: ' , res[0]);
                result(null,res[0])
            }

        }
    )
}
Usuario.findbyEmail = (email,result)=>{
    const sql = `
    SELECT 
    id,
    email,
    nombre,
    apellido,
    telefono,
    imagen,
    password
    FROM usuarios
    WHERE
    email = ?

    `
    db.query(
        sql,
        [email], (err,res)=>{
            if (err){
                console.log('Error' ,err);
                result(err,null)
            }else{
                console.log('Usuario obtenido: ' , res[0]);
                result(null,res[0])
            }

        }
    )
}
Usuario.create = async (usuario,result)=>{
    const hast = await bcrypt.hash(usuario.password,10)
    const sql =`
    INSERT INTO
    usuarios(email,nombre,apellido,password,telefono,imagen,created_at,updated_at)
    VALUES(?,?,?,?,?,?,?,?)
    `;
    db.query(
        sql,[
            usuario.email,
            usuario.nombre,
            usuario.apellido,
            hast,
            usuario.telefono,
            usuario.imagen,
            new Date(),
            new Date()


        ],
        (err,res)=>{
            if (err){
                console.log('Error' ,err);
                result(err,null)
            }else{
                console.log('id nuevo usuario: ' , res.insertId);
                result(null,res.insertId)
            }

        }
        )
}
module.exports = Usuario;