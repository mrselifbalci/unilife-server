const express = require('express')
const router = express.Router()


const cityController = require('../controllers/cities.controllers')

router.get('/cities', cityController.getAllCities)
router.get('/cities/:id', cityController.getSingleCity)
router.post('/cities', cityController.create)
router.patch('/cities/:id', cityController.updateCity)
router.delete('/cities/:id', cityController.deleteCity)
 

module.exports = router