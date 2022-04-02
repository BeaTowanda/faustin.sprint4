const modelCrud = require('../data/modelCrud');
const userModel = modelCrud("userJson");
function recordarMiddle (req,res,next){
    if((req.cookies.recordame != undefined) && 
       (req.session.usuarioLog == undefined)) {
           req.cookies.recordame = req.session.usuarioLog
       } 
       /* aquí está faltando comparar con lo que tengo en archivo */
}
module.exports = recordarMiddle
const fs = require("fs");
const path = require("path");

function findAll(){
    const users =  userModel.all();
   
    return users;
}

function recordar (req, res , next){
    if(!req.session.usuarioLogueado && req.cookies.user){
        let users = findAll()
        const usuarioCookies = users.find(function(user){
            return user.id == req.cookies.user
        })

        let user = {
            id: usuarioCookies.id,
            name: usuarioCookies.nombre,
            last_name: usuarioCookies.apellido,
            //avatar: usuarioCookies.avatar,
        }

        req.session.usuarioLogueado = user;

        return next()

    }else{
        return next()
    }
}
module.exports = recordar;