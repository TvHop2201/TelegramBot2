const express = require('express')
const Route = express.Router()
const adminController = require('../controller/admin')
const auth = require('../middleware/auth')

//user
Route.get('/getUser', auth.check, adminController.getUser)
Route.get('/getChartUser', auth.check, adminController.getCharUser)
Route.get('/findModeTableUser/', auth.check, adminController.findModeTableUser)
Route.post('/updateUser', auth.check, adminController.updateUser)
//point
Route.get('/getChartPoint', auth.check, adminController.getChartPoint)
Route.get('/getPointMessage/', auth.check, adminController.getPointMessage)
Route.post('/updatePointMessage', auth.check, adminController.updatePointMessage)
Route.get('/deletePointMessage', auth.check, adminController.deletePointMessage)
//dashboard
Route.get('/getChartUserWithTime/', auth.check, adminController.getChartUserWithTime)
//logUser
Route.post('/createLogUser', auth.check, adminController.createLogUser)
Route.get('/getLogUser', auth.check, adminController.getLogUser)
Route.get('/findLogUser', auth.check, adminController.findLogUser)


module.exports = Route