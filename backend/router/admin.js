const express = require('express')
const Route = express.Router()
const adminController = require('../controller/admin')

//user
Route.get('/getUser', adminController.getUser)
Route.get('/getOneUser/:id', adminController.getOneUser)
Route.get('/getOneUserByUserName/:userName', adminController.getOneUserByUserName)
Route.get('/getAllUser', adminController.getAllUser)
Route.get('/getChartUser', adminController.getCharUser)
Route.get('/findModeTableUser/', adminController.findModeTableUser)
Route.post('/updateUser', adminController.updateUser)
//point
Route.get('/getChartPoint', adminController.getChartPoint)
Route.get('/getPointMessage/:page/:limit', adminController.getPointMessage)
Route.get('/getOnePointMessage/:id', adminController.getOnePointMessage)
//dashboard
Route.get('/getChartUserWithTime/:time', adminController.getChartUserWithTime)

//test
Route.get('/create', adminController.createUser)



module.exports = Route