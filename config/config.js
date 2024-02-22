const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'delibery_db'
});
db.connect(function(err){
    if(err) throw err;
    console.log('se conecto con exito');
})
module.exports = db;