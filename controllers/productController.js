
const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const modelCrud = require('../data/modelCrud');

/*let tableName = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf-8") */

const productModel = modelCrud("productos");
 

const controller = {
    detail: (req, res) => {
       /*busco producto */
        let id=req.params.id;
        let producto = productModel.find(id);  
        /*busco relacionados*/         
        let filtrados = productModel.findSimilares(id); 
        console.log("en controller filtrados es = "+ filtrados)        
        res.render("detallProdNuevo",{producto,filtrados});
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