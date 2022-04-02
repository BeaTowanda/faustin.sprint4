const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    return users;
}

const validatorU = {
    login:[
        check("usuario")
            .notEmpty()
            .withMessage("Debe ingresar Usuario Registrado"),
        check("contraseña")
            .notEmpty()
            .withMessage("Debe Ingresar Contraseña Registrada")
    ],
    register:[
        check('usuario')
        .isLength({min:8}). withMessage('Nombre De usuario MINIMO 8 caractres')
        .bail()
        .custom(function(value){  
            //busco al usuario
            let userFound = userModel.findUser(value);                            
            //si existe un usuario devuelvo el error
            if(userFound){
                throw new Error("USUARIO  ya registrado!");
            }
            //sino devuelvo true
            return true
        })
        ,
        check('primerNombre')
        .isLength({min:2}).withMessage('Debe ingresar un nombre COMPLETO'),        
        check('apellido')
        .isLength({min:2}).withMessage('Debe ingresar un apellido COMPLETO'),
        check('contraseña')
        .isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres')
        .bail()
        .custom(function(value){  
            //busco al usuario                                        
            //si existe un usuario devuelvo el error
            if(value !== "contraseña"){
                throw new Error("No se ha podido RE-CONFIRMAR contraseña");
            }
            //sino devuelvo true
            return true
        })
        ,       
        check('mail') 
        .notEmpty().withMessage("Email vacio")
        .bail()     
        .isEmail().withMessage('Mail NO Válido')
        .custom(function(value){  
            //busco al usuario
            let userFound= userModel.findMail(value);                            
            //si existe un usuario devuelvo el error
            if(userFound){
                throw new Error("Email ya registrado!");
            }
            //sino devuelvo true
            return true
        })
        ,
        check('fechaNacimiento')
        .isDate().withMessage('Fecha Incorrecta ')
        // falta que sea mayor de edad buscar la función que dió AXEL

    ]
}

module.exports = validatorU