const express = require('express')
const Route = express.Router()
const adminController = require('../controller/admin')

//user
Route.get('/getUser/:page', adminController.getUser)
Route.get('/getOneUser/:id', adminController.getOneUser)
Route.get('/getOneUserByUserName/:userName', adminController.getOneUserByUserName)
Route.get('/getAllUser', adminController.getAllUser)
Route.get('/getChartUser', adminController.getCharUser)
Route.get('/findModeTableUser/:mode/:key', adminController.findModeTableUser)
//point
Route.get('/getChartPoint', adminController.getChartPoint)
Route.get('/getPointMessage/:page', adminController.getPointMessage)
Route.get('/getOnePointMessage/:id', adminController.getOnePointMessage)
//dashboard
Route.get('/getChartUserWithMonth/:month', adminController.getChartUserWithMonth)

//test
Route.get('/create', adminController.createUser)


module.exports = Route