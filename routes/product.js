const express = require("express");
const router = express.Router()
const multer = require("multer")
const productController = require("../controllers/productController")
const {body, check} = require('express-validator')
const validatorP = require("../validator/validatorProduct");


router.get('/detail/:id', productController.detail);
/*router.get("/login",productController.login)
router.get("/register",productController.register);*/
router.get("/carrito",productController.carrito);
router.get("/finCarrito",productController.finCarrito);
// viene el crud
router.get("/listProductos",productController.list);
router.get("/detailOne/:id",productController.detailOne)
router.post("/updateOne/:id",validatorP.updateProducto,productController.storeUpdate)

router.get("/altaProducto",productController.altaP);
router.post("/altaProducto",validatorP.altaProducto,productController.storeAlta);

router.get("/bajaProducto/:id",productController.bajaProducto)
router.post("/bajaProducto", productController.storeDelete)

router.get("/ofertas",productController.ofertas);

module.exports = router;