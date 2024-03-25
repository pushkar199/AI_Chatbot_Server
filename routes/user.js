const express = require('express')
const router = express.Router()
const {getUsers, signUp, login} = require('../controller/user')


router.get('/', getUsers)
router.post('/signup', signUp)
router.post('/login', login)


module.exports = router