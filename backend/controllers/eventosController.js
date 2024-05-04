const asyncHandler = require('express-async-handler')
const Evento = require('../models/eventosModel')

const getEventos = asyncHandler ( async (req, res) => {
    
    const eventos = await Evento.find()
    res.status(200).json(eventos)
})

const crearEventos = asyncHandler(async (req, res) => {

    if(!req.body.descripcion || !req.body.nombre){
        res.status(400)
        throw new Error('Datos incompletos')

    }
    const evento = await Evento.create({
        nombre: req.body.nombre,
        descripcion : req.body.descripcion,
        user: req.user.id
    })

    res.status(201).json(evento)
})

const updateEventos = asyncHandler(async (req, res) => {
    // buscamos el evento que deseamos modificar
    const evento = await Evento.findById(req.params.id)

    if(!evento) {
        res.status(404)
        throw new Error('El evento no existe')
    }

    // Se vuelve a buscar para modificar 
    const eventoUpdated = await Evento.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({message: `Modificar el evento: ${req.params.id}`})
})

const deleteEventos = asyncHandler ( async (req, res) => {

    const evento = await Evento.findById(req.params.id)

    if(!evento) {
        res.status(404)
        throw new Error('El evento no existe')
    }

    // De esta forma es un poco más eficiente porque solo se busca una vez
    await Evento.deleteOne(evento)


    res.status(200).json({message: `Evento eliminado: ${req.params.id}`})
})


module.exports = {
    getEventos,
    crearEventos,
    updateEventos,
    deleteEventos
}