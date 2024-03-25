const {OpenAI} = require("openai");
require('dotenv').config();


const configureOpenAI = () =>{
    const config = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET,  // Your OpenAI API key here
        
    });
    return config;
};


module.exports = configureOpenAI