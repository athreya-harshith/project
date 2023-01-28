const express = require('express')
const route = express.Router()
const {userProfile} = require('../controllers/userProfileController')
route.get('/userProfile', userProfile)

module.exports = route