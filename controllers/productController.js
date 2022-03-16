
const fs = require('fs');
const path = require('path');
const model = require('../data/model');

let tableName = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf-8")

const productModel = model('product');

const { urlencoded } = require("express");
const controller = {
    detail: (req, res) => {
        let id=req.query.id;
        let producto =productModel.find(id);
        /*let producto = model(jsontable).find(id);*/
        res.render("detallProdNuevo",{producto})
    },
    login: (req,res) =>{
        res.render("login")
    },
    register: (req,res) =>{
        res.render("formularioRegistro")
    },
    carrito: (req,res) => {
        res.render("carritoDeCompras")
    },
    finCarrito: (req,res) => {
        res.render("finCarrito")
    },
    altaProducto: (req,res) => {
        res.render("altaProducto")
    },
    storeAlta: (req,res) =>{
        res.render("altaProducto")
    },
    ofertas: (req,res) => {
        res.render("ofertas")
    },
    
};

module.exports = controller;