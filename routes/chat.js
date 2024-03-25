const express = require('express')
const router = express.Router()
const {newChat, allChats, deleteChat} = require('../controller/chat')
const authToken = require('../middleware/authToken')

router.post('/new', authToken, newChat)
router.get('/all-chats', authToken, allChats)
router.delete('/delete',authToken, deleteChat)


module.exports = router

