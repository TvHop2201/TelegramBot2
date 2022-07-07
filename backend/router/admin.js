const express = require('express')
const Route = express.Router()
const adminController = require('../controller/admin')

//user
Route.get('/getUser', adminController.getUser)
Route.get('/getChartUser', adminController.getCharUser)
Route.get('/findModeTableUser/', adminController.findModeTableUser)
Route.post('/updateUser', adminController.updateUser)
//point
Route.get('/getChartPoint', adminController.getChartPoint)
Route.get('/getPointMessage/', adminController.getPointMessage)
Route.post('/updatePointMessage', adminController.updatePointMessage)
Route.get('/deletePointMessage', adminController.deletePointMessage)
//dashboard
Route.get('/getChartUserWithTime/', adminController.getChartUserWithTime)
//logUser
Route.post('/createLogUser', adminController.createLogUser)


module.exports = Route