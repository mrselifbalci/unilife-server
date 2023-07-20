var express = require('express');
var router = express.Router();

const propertyTypesControllers = require('../controllers/propertyTypes.controllers');

router.get('/propertyTypes', propertyTypesControllers.getAll);
// router.get('/properties/:id', propertiesControllers.getSingleProperty);
// router.get('/properties/city/:city_id', propertiesControllers.getPropertiesByCityId);
// router.post('/propertyTypes', propertyTypesControllers.create);
// router.post('/properties/many', propertiesControllers.createMany);
// router.patch('/properties/:id', propertiesControllers.updateProperty);
router.delete('/propertyTypes/:id', propertyTypesControllers.deleteType);  

 
module.exports = router;  