var express = require('express');
var router = express.Router();
const path = require('path');

const userController = require("../controllers/userController")
const {body, check} = require('express-validator')
const validatorU = require("../validator/validatorUser");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/avatars'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFilename = 'nuevo-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});
const upload = multer({ storage });

router.get("/login",userController.login);
router.post("/login",validatorU.login,userController.processLogin);
 /* falta actualizar ROUTER cuando pueda leer el body CON LOS DOS MIDDLEWARE */
router.get("/register",userController.register)
router.post("/register", upload.single("avatar"),validatorU.register,userController.altaRegister);
//* si se olvidó la contraseña ( ver )
router.get("/olvido",userController.forgot)
router.post("/olvido",validatorU.olvidoV,userController.activarSesion)
//*cambiar contraseña
//router.get("/cambio/:id",userController.cambioPass)
//router.post("/cambio/:id",validatorU.cambio,userController.regCambioPass)

router.get("/borrar",userController.baja)
router.post("/borrar",validatorU.olvidoV,userController.delete)

router.get("/listUsuarios",userController.list);
router.get("/detailOne/:id",userController.detailOne)
router.post("/updateOne/:id",validatorU.updateUser,userController.storeUpdate)
//
router.get("/cerrarSesion",userController.ConfirmLogout)
router.post("/cerrarSesion",userController.logout)

module.exports = router;
