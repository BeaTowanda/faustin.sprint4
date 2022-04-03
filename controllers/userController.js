const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const {validationResult, body} = require("express-validator")
const modelCrud = require('../data/modelCrud');
const bcrypt = require("bcryptjs")
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

const userModel = modelCrud("userJson");
// función validar Contraseña
function validarContraseña(userID){     
       // con idUsuario  verifica contraseña     
    let contraseñaGuardada = userID.contraseña;
    let contraseñaEncriptada =  bcrypt.hashSync(value, 10);
    return bcrypt.compareSync(contraseñaGuardada,contraseñaEncriptada)
}
//************************** */
const controller = {
    
    login: (req,res) =>{        
        res.render("login")
    }, 
    processLogin :(req,res) =>{
        const errors = validationResult(req);        
        
        if(errors.errors.length > 0){
            res.render("login", {errorsLogin: errors.mapped()})
        }    
        const userID =  userModel.findUser(req.body.usuario); 
  
        if (validarContraseña) {    
            if (req.body) {
            //proceso session
                let user = {
                //aquí
                id: userID.id,
                usuario :req.body.usuario,
                primerNombre: req.body.primerNombre,
                apellido: req.body.apellido,
                mail: req.body.mail           
                //avatar: userFound.avatar,
                }

                req.session.usuarioLogueado = user

                if(req.body.recordame){
                res.cookie("user", user.id, {maxAge: 50000 * 24})
                }

                res.redirect("/")
        }
        }else{
            res.render("login", {errorMsg: "No se ha podido realizar REGISTRO"})
        } 
    },
    
    forgot: (req,res) =>{        
        res.render("loginOlvide")
    },  
    
    activarSesion: (req,res) =>{ 
        let errors =[];
        errors = validationResult(req);       
        if(errors.errors.length > 0){
           return res.render("loginOlvide", {errorsOlvido: errors.mapped()})
        }          
        res.render("login")
    }, 
    register: (req,res) =>{
        res.render("formularioRegistro")
    },
    altaRegister: (req,res) =>{
        let errors =[];
        errors = validationResult(req); 
          
        if(errors.errors.length > 0){
           return res.render("formularioRegistro", {errorsReg: errors.mapped()})
        }      
        
        else {
            //let fecha = date.now() igual después usaré timesstamp
            let userAlta = {   
                usuario: req.body.usuario,             
                primerNombre: req.body.primerNombre,
                apellido: req.body.apellido,
                mail: req.body.mail,
                fechaNacimiento:req.body.date,
               // fechaAlta: fecha,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),               
                //avatar: userFound.avatar,
            }
            
            userModel.create(userAlta);
            res.redirect("/users/login")};         
    },
    ConfirmLogout:function(req, res){
       // usuario = session.usuarioLogueado.usuario
       // console.log(usuario + "  es el req.session.usuario")
        res.render("confirmaLogout")  
    },   
    logout:function(req, res){

        req.session.destroy();       
        res.clearCookie("user");
        res.redirect("/");
    }
};

module.exports = controller;