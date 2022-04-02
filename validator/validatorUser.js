const bcrypt = require("bcryptjs/dist/bcrypt");
const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");
const modelCrud = require('../data/modelCrud');
const userModel = modelCrud("userJson");


const validatorU = {
    login:[
        check("usuario")
            .notEmpty()
            .withMessage("Debe ingresar Usuario Registrado")
            .bail()
            .custom(function(value){  
                //busco al usuario
                let userFound= userModel.findUser(value);                            
                //si existe un usuario devuelvo el error
                if(userFound == undefined){
                    throw new Error("Usuario Inexistente");
                }
                //sino devuelvo true
                return true
            }),
        check("contraseña")
            .notEmpty()
            .withMessage("Debe Ingresar Contraseña")
            .bail()
            .custom(function(value){  
                // con nombre de usuario tengo que verificar contraseña
                //busco al usuario
                let userId= userModel.findUser("usuario");  
                let row = userModel.find(userId);
                let contraseñaGuardada = row.contraseñaGuardada;
                let contraseñaEncriptada =  bcrypt.hashSync(value, 10)
                validarContraseña = bcrypt.compareSync(contraseñaGuardada,contraseñaEncriptada)
                                       
                //si NO coinciden las contraseñas
                if ( !validarContraseña){
                    throw new Error("Debe Ingresar Contraseña Registrada para este Usuario ");
                }
                //sino devuelvo true
                return true
            })   
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
        .isLength({min:5}).withMessage('Contraseña debe ser mínimo 5 caracteres'),
        check("contraseñaConfirma")
        .notEmpty().withMessage("Debe reconfirmar Contraseña ")
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
        .isDate().withMessage('Fecha Incorrecta '),
        // falta que sea mayor de edad buscar la función que dió AXEL
        check('terminos')
        .isEmpty().withMessage('Debe aceptar Términos y condiciones '),
    ]
}

module.exports = validatorU