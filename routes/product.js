const express = require("express");
const router = express.Router()
const multer = require("multer")
const productController = require("../controllers/productController")
const {body, check} = require('express-validator')


router.get('/detail/:id', productController.detail);
/*router.get("/login",productController.login)
router.get("/register",productController.register);*/
router.get("/carrito",productController.carrito);
router.get("/finCarrito",productController.finCarrito);
router.get("/altaProducto",productController.altaProducto);
router.post("/altaProducto",productController.storeAlta);
router.get("/bajaProducto",productController.bajaProducto)
router.post("/bajaProducto",[
    check('name').isEmpty().withMessage('Debe ingresar un nombre COMPLETO')],    
productController.borrarProducto);
router.get("/ofertas",productController.ofertas);

module.exports = router;