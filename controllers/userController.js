const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const {validationResult, body} = require("express-validator")
const modelCrud = require('../data/modelCrud');
const bcrypt = require("bcryptjs")
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

const userModel = modelCrud("userJson");

const controller = {
    
    login: (req,res) =>{        
        res.render("login")
    }, 
    processLogin :(req,res) =>{
        const errors = validationResult(req);        
        
        if(errors.errors.length > 0){
            res.render("login", {errorsLogin: errors.mapped()})
        }

        //const userFound =  userModel.findUser(req.body.usuario);         

        if (req.body) {
            //proceso session
            let user = {
                //aquí
                id: userModel.findMail(req.body.mail),
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

        }else{
            res.render("login", {errorMsg: "No se ha podido realizar REGISTRO"})
        } 
    },
    
    forgot: (req,res) =>{        
        res.render("loginOlvido")
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
            let userAlta = {
                id: userModel.nextId(),
                primerNombre: req.body.primerNombre,
                apellido: req.body.apellido,
                mail: req.body.mail,
                fechaNacimiento:req.body.date,
                fechaAlta:date(),
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),               
                //avatar: userFound.avatar,
            }
            userModel.writeFile(userAlta);
            res.redirect("/users/login")};         
    },
    logout:function(req, res){
        req.session.destroy();       
        res.clearCookie("user");
        res.redirect("/");
    }
};

module.exports = controller;