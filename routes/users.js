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
router.post("/register",userController.altaRegister)

module.exports = router;
