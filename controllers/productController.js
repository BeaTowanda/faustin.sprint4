
const fs = require('fs');
const path = require('path');
const { urlencoded } = require("express")
const {validationResult, body} = require("express-validator")
const modelCrud = require('../data/modelCrud');
const res = require('express/lib/response');


/*let tableName = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf-8") */

const productModel = modelCrud("productos");
 

const controller = {
    detail: (req, res) => {
       /*busco producto */
        let id=req.params.id;
        console.log(id)
        let producto = productModel.find(id);  
        console.log(producto.name)
        console.log(producto.id)
        /*busco relacionados*/         
        let filtrados = productModel.findSimilares(id);
        /*solo puede imprimir 3 relacionados */
        let fin = 0;
        if (filtrados.length !== 0 ){
            if (filtrados.length >3) {
                fin = 3
            }
            else {fin = filtrados.length}           
        }
        console.log(filtrados)          
        res.render("detallProdNuevo",{producto,filtrados,fin});
    },
   
    carrito: (req,res) => {
        res.render("carritoDeCompras")
    },
    finCarrito: (req,res) => {
        res.render("finCarrito")
    },     
    bajaProducto: (req,res) =>{                   
        res.render("bajaProducto")
    }, 
    borrarProducto : (req,res) =>{
        let errors =[];
        errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()){
            console.log("encontró errores ")
            return res.render('bajaProducto', {errors: errors.errors})
        } 
        console.log("datos del query son "+ req.body)       
        let nombre= req.body.name;
        
        console.log("el body.name es  "+ nombre);
        let producto = productModel.findName(nombre);

        if (producto == undefined){
        res.render("bajaProducto")}
        else { id=producto.id; 
            productModel.delete(id)}
    },   
    altaProducto: (req,res) => {
        res.render("altaProducto")
    },   
    storeAlta: (req,res) =>{
        console.log("body name es " + req.body.name)
        let newProduct = {            
            name: req.body.name ,
            description :req.body.description,
            description2 :req.body.description2,
            description3 : req.body.description3, 
            price: req.body.price,
            descuento :req.body.descuento,
            colection :req.body.colection,
            color : req.body.color,
            tipo : req.body.tipo,
            cantidad : req.body.cantidad 
        };
        console.log (req.body.name + " es el nombre del producto alta");
        let data = productModel.create(newProduct);
        res.render("altaProducto",{data})
    },
    ofertas: (req,res) => {
        res.render("ofertas")
    },     
};

module.exports = controller;