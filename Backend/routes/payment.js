const express = require('express');
const Router=express.Router()
const paymentController = require('../controllers/payment')

Router.post('',paymentController.createOrder)
Router.post('/save',paymentController.saveTransaction)
module.exports=Router