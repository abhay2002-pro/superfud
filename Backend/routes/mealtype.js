const express = require('express');
const MealTypeController = require('../controllers/mealtype')
const router = express.Router();
router.get('',MealTypeController.getAllMealTypes)

module.exports=router;