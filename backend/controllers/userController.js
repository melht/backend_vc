const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const register = asyncHandler( async (req, res) => {

    // desestructurar
    const {name, email, password} = req.body

    // verificar que me pasen los datos
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos')
    }

    // verificar que el usuario no está repetido
    const userExiste = await User.findOne({email})
    if(userExiste) {
        res.status(400)
        throw new Error('Ese usuario ya exite en la base de datos')
    }

    //Hacemos el HASH
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login = asyncHandler( async (req, res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if (user&& (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else{
        res.status(401)
        throw new Error ("Credenciales incorrectas")

    }
})

const generarToken = (idusuario) => {
    return jwt.sign({idusuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const showdata = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

const updateUser = asyncHandler( async (req,res) =>{
    // buscamos el usuario que deseamos modificar
    const usuario = await User.findById(req.params.id)

    if(!usuario) {
        res.status(404)
        throw new Error('El usuario no existe')
    }

    // Se vuelve a buscar para modificar 
    const usuarioUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({message: `User modificado: ${req.params.id}`})
})

const deleteUser = asyncHandler( async (req,res)=>{
    const usuario = await User.findById(req.params.id)

    if(!usuario) {
        res.status(404)
        throw new Error('El usuario no existe')
    }

    // De esta forma es un poco más eficiente porque solo se busca una vez
    await User.deleteOne(usuario)


    res.status(200).json({message: `User eliminado: ${req.params.id}`})
})

module.exports = {
    register,
    login,
    showdata,
    updateUser,
    deleteUser
}