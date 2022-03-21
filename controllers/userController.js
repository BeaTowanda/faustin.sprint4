const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const {validationResult, body} = require("express-validator")
const modelCrud = require('../data/modelCrud');
const res = require('express/lib/response');

const userModel = modelCrud("userJson");

const controller = {
    
    login: (req,res) =>{
        res.render("login")
    },    
    register: (req,res) =>{
        res.render("formularioRegistro")
    },
    altaRegister: (req,res) =>{
        res.render("formularioRegistro")
    }
};

module.exports = controller;