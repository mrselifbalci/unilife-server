var express = require('express');
var router = express.Router();

const propertiesControllers = require('../controllers/properties.controllers');

router.get('/properties', propertiesControllers.getAll);
router.get('/properties/:id', propertiesControllers.getSingleProperty);
router.get('/properties/city/:cityid', propertiesControllers.getPropertiesByCityId);
router.post('/properties', propertiesControllers.create);
router.patch('/properties/:id', propertiesControllers.updateProperty);
router.delete('/properties/:id', propertiesControllers.removeSingleProperty);   
 
module.exports = router;  