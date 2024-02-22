const db = require("../config/config");
const Usuario = {}
Usuario.create = (usuario,result)=>{
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
            usuario.password,
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