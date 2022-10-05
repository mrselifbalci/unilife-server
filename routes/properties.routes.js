var express = require('express');
var router = express.Router();

const propertiesControllers = require('../controllers/properties.controllers');

router.get('/properties', propertiesControllers.getAll);
router.get('/properties/:id', propertiesControllers.getSingleProperty);
router.get('/properties/city/:city_id', propertiesControllers.getPropertiesByCityId);
router.post('/properties', propertiesControllers.create);
router.post('/properties/many', propertiesControllers.createMany);
router.patch('/properties/:id', propertiesControllers.updateProperty);
router.delete('/properties/:id', propertiesControllers.removeSingleProperty);  

 
module.exports = router;  