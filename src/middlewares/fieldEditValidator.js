const { check, validationResult, body } = require('express-validator')
const db = require('../database/models')


module.exports = [

    // VALIDA NOMBRE Y APELIIDO

    check('nombre')
        .isLength({
            min: 3
        })
        .withMessage('El campo \'nombre\' debe tener al menos 3 caracteres')
    ,
    check('apellido')
        .isLength({
            min: 3
        })
        .withMessage('El campo \'apellido\' debe tener al menos 3 caracteres')
    ,

    //VALIDA CAMPO EDAD

    function(req,res,next){
        if (req.body.edad >= 18) {
            return next()
        } else {
            res.send({ msg: 'La persona debe tener al menos 18 años' })
        }
    }

]
