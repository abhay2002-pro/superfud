const express = require('express');
const Router=express.Router()
const menuController= require('../controllers/menu')

Router.get('/:rName',menuController.getAllMenuByRestaurantName)

module.exports=Router