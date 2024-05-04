const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {getEventos, crearEventos, updateEventos, deleteEventos} = require('../controllers/eventosController')

router.route('/').get(getEventos).post(protect, crearEventos)

router.put('/:id', protect, updateEventos)
router.delete('/:id', protect, deleteEventos)

module.exports = router