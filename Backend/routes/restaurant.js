const express = require('express');
const restaurantController = require('../controllers/restaurant')
const router = express.Router();
router.get('',restaurantController.getAllRestaurants)

router.get('/Locations',restaurantController.getAllLocation)
router.get('/:cname',restaurantController.getRestaurantByCity)
router.get('/Details/:name',restaurantController.getRestaurantDetails)
router.post('/filter/:pageNo',restaurantController.getAllRestaurantsByFilter)

// router.post('',restaurantController.addRestaurant)
// router.put('',restaurantController.UpdateRestaurant)
// router.delete('/:id',restaurantController.DeleteRestaurant)

module.exports=router;