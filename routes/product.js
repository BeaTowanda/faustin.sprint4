const express = require("express");
const router = express.Router()
const productController = require("../controllers/productController")


router.get('/detail/:id', productController.detail);
router.get("/login",productController.login)
router.get("/register",productController.register);
router.get("/carrito",productController.carrito);
router.get("/finCarrito",productController.finCarrito);
router.get("/altaProducto",productController.altaProducto);
router.get("/ofertas",productController.ofertas);

module.exports = router;