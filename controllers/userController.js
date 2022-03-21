const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const {validationResult, body} = require("express-validator")
const modelCrud = require('../data/modelCrud');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');

const userModel = modelCrud("userJson");

const controller = {
    
    login: (req,res) =>{
        res.render("login")
    }, 
    processLogin :(req,res) =>{
        let errors =[];
        errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            console.log("encontró errores ")
            return res.render('login', {errors: errors.errors})
        };
        let usuario= req.body.usuario;
        
        console.log("el body.usuario es  "+ usuario);
        let verUsuario = userModel.findUser(usuario);
        if (verUsuario == undefined){
            res.render("login",{errors:[{msg:"Usuario NO Existe"}]});
        };
        if (verUsuario.contraseña !== req.body.contraseña){
            res.render("login",{errors:[{msg:"CONTRASEÑA INVALIDA"}]})
        }
        else { req.session.usuarioLog == verUsuario};
        /*implemento cookie pero activar cuando lea bien el BODY*/
        /*if (req.session.usuarioLog !== undefined){
            res.cookie ("recordame",verUsuario.id, {maxAge : 60000})
        };*/
        res.render("/");
    }, 
    register: (req,res) =>{
        res.render("formularioRegistro")
    },
    altaRegister: (req,res) =>{
        let errors =[];
        errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            console.log("encontró errores ")
            return res.render('formularioRegistro', {errors: errors.errors})
        }
        console.log("datos del body son "+ req.body)       
        let usuario= req.body.usuario;
        
        console.log("el body.usuario es  "+ usuario);
        let verUsuario = userModel.findUser(usuario);
        if (verUsuario){
            res.render("formularioRegistro")
        }
        else {redirect("/")};         
    }
};

module.exports = controller;