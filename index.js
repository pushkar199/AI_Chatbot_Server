const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')
const PORT = process.env.PORT || 4000
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/Chat_AI')
.then(()=>{
    console.log( "MongoDB Connected!" )
}).catch((error)=>{
    console.log(error.message)
})


app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.use(express.json());  


app.use('/user', userRoutes)
app.use('/chat', chatRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})