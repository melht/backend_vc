const jwt = require('jsonwebtoken')
const asyncHandler =  require('express-async-handler')
const User = require('../models/userModel')

// va a verificar que nos hayamos conectado
const protect = asyncHandler( async (req,res,next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //obtenemos el token
            // Lo volvemos array 
            token = req.headers.authorization.split(' ')[1]

            // verificar la forma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario del payload del token y lo vamos a poner en un objeto
            // Pone todos los datos menos el password
            req.user = await User.findById(decoded.idusuario).select('-password')

            next()

        } catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Accesso no autorizaqdo')
        }

        if(!token) {
            res.status(401)
            throw new Error ('Acceso no autorizado, no proporcionaste el token')
        }
        
    }
})

module.exports = {
    protect
}