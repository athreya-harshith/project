const express = require('express')
const route = express.Router()

const  {forgotPage} = require('../controllers/forgotController')
route 
.get('/',forgotPage)

module.exports = route ;