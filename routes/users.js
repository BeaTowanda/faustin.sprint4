var express = require('express');
var router = express.Router();

const multer = require("multer")
const userController = require("../controllers/userController")
const {body, check} = require('express-validator')
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.get("/login",userController.login)

router.get("/register",userController.register)
router.post("/register",[
  check('usuario').isLength({min:8}).withMessage('Nombre De usuario MINIMO 8 caractres'),
  check('nombre').isLength({min:2}).withMessage('Debe ingresar un nombre COMPLETO'),
  check('apellido').isLength({min:2}).withMessage('Debe ingresar un apellido COMPLETO'),
  check('contraseña').isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres'),
  check('mail').isEmail().withMessage('Mail NO Válido'),
  check('fechaNacimiento').isDate().withMessage('Fecha Incorrecta ')  
],
userController.altaRegister)

module.exports = router;
