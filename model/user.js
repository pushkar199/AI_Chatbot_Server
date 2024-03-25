const mongoose = require('mongoose')
const { randomUUID } =require("crypto");

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID(),
      },
    content:{
        type :String,
        required :true
    }
})

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {  
        type: String,  
        unique: true,  
        required: true
    },
    password: { 
        type: String,  
        required: true  
    },
    chat:[chatSchema]
})




const User = mongoose.model('User', userSchema)
module.exports = User