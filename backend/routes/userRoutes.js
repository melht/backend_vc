const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const {login, register, showdata, updateUser, deleteUser} = require('../controllers/userController')

// Cuando alguien teclee api users / login se va a llamar al login
// Esta conectado con api users
router.post('/login', login)
router.post('/register', register)
router.get('/showdata', protect, showdata)
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, deleteUser)

module.exports = router