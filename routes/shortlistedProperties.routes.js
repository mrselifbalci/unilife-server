const express = require('express');
const router = express.Router();
const shortlistedPropertiesControllers = require('../controllers/shortlistedProperties.controllers');

router.get('/shortlistedProperties', shortlistedPropertiesControllers.getAllShortlistedProperties);
router.get('/shortlistedProperties/user/:userid', shortlistedPropertiesControllers.getShortlistedPropertiesByUserId); 
router.post('/shortlistedProperties/search', shortlistedPropertiesControllers.checkExistence);
router.post('/shortlistedProperties', shortlistedPropertiesControllers.createShortlistedProperty);
router.patch('/shortlistedProperties/:id', shortlistedPropertiesControllers.updateShortlistedProperty);
router.delete('/shortlistedProperties/:id', shortlistedPropertiesControllers.deleteShortlistedProperty); 
 
module.exports = router;      