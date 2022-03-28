
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
    list: (req,res) => {
        let productsFound = productModel.all();
        res.render("listProductos",{products:productsFound})
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
        console.log("body de coleccion "+ req.body.colection)
        console.log("body de description : "+ req.body.description)
        console.log("body de descri 2 : "+ req.body.description2)
        console.log("body de anio " + req.body.anio)
        console.log("body de color" + req.body.color)
        console.log("body price es " + req.body.price)
        console.log("body de tipo "+ req.body.tipo)
        console.log("body de canitdad " + req.body.cantidad)
        console.log("body de color" + req.body.color)
        console.log("body de colection" + req.body.colection)

        const errors = validationResult(req);        
        console.log("la lenght de errores es : " + errors.errors.length)
        if(errors.errors.length > 1){
            /*ver esto porque hay un error que no encuentro y puse 1 */
            console.log("los errores en store Alta son: " )
            console.log(errors.errors.name + "error en el nombre del producto")
            console.log(errors.errors.description + "description")
            console.log(errors.errors.description2 + "error descriocion 2")
            console.log(errors.errors.price + "price")
            console.log(errors.errors.anio + "error en anio")
            console.log(errors.errors.color + "error color")
            console.log(errors.errors.colection + "error en colection")
            console.log(errors.errors.tipo + "error en tipo")
            console.log(errors.errors.cantidad + "error en cantidad")

            /*armo valores para modificar falta CUANDO HAGA MODIFICAFR */
            res.render("altaProducto", {errorsProd: errors.mapped()})
             };
         if (errors.errors.length == 1 ){         
            console.log("está en else de alta " + req.body.name)           
            let newProduct = {            
                name: req.body.name ,
                description :req.body.description,
                description2 :req.body.description2,
                description3 : req.body.description3, 
                price: req.body.price,
                descuento :req.body.descuento,
                colection :req.body.colection,
                anio: req.body.anio,
                color : req.body.color,
                tipo : req.body.tipo,
                cantidad : req.body.cantidad 
                };
            
                console.log (newProduct.name + " es el nombre del producto alta");
                console.log(newProduct.colection + newProduct.color + newProduct.tipo + newProduct.price)
                let data = productModel.create(newProduct);            
                res.render("altaProducto",{data} )
        }; /*acá termina el else */ 
    },
    ofertas: (req,res) => {
        res.render("ofertas")
    },     
};

module.exports = controller;