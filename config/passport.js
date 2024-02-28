const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const keys = require('./keys');
const Usuario = require('../modelos/usuarios');
module.exports = (passport)=>{
    let opciones ={}
    opciones.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opciones.secretOrKey = keys.secretOrKey;
    passport.use(new JwtStrategy(opciones, (jwt_payload,done)=>{
        Usuario.findByid(jwt_payload.id,(err,usuario)=>{
            if(err){
                return done(err,false);
            }
            if (usuario){
                return done(null,usuario);
            }
            else{
                return done (null,false);
            }
        })
    }));
}
