var express = require('express');
var router = express.Router();

const multer = require("multer")
const userController = require("../controllers/userController")
const {body, check} = require('express-validator')
const validatorU = require("../validator/validatorUser");

router.get("/login",userController.login);
router.post("/login",validatorU.login,userController.processLogin);
 /* falta actualizar ROUTER cuando pueda leer el body CON LOS DOS MIDDLEWARE */
router.get("/register",userController.register)
router.post("/register",validatorU.register,userController.altaRegister);
//* si se olvidó la contraseña ( ver )
router.get("/olvido",userController.forgot)
router.post("/olvido",validatorU.olvidoV,userController.activarSesion)
//
router.get("/cerrarSesion",userController.ConfirmLogout)
router.post("/cerrarSesion",userController.logout)

module.exports = router;
