var express = require('express');
var router = express.Router();

const subscriptionsControllers = require('../controllers/subscriptions.controllers');

router.get('/subscriptions', subscriptionsControllers.getAllSubscriptions);
router.get('/subscriptions/:id', subscriptionsControllers.getSingleSubscription);
router.post('/subscriptions', subscriptionsControllers.create);
router.patch('/subscriptions/:id', subscriptionsControllers.updateSubscription);
router.delete('/subscriptions/:id', subscriptionsControllers.deleteSubscription);   
 
module.exports = router;  