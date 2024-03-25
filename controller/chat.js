const User = require('../model/user')
const configureOpenAI = require('../config/openai')
const {OpenAI} = require("openai");
const authToken = require('../middleware/authToken')

async function newChat (req,res,next){
    const { message } = req.body;
    try {
      const user = await User.findById(req.userId); // Fetch user using userId
      if (!user) {
          return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
      }

      // grab chats of user
      const chat = user.chat.map(({ content }) => ({ content }));
      chat.push({ content: message });
      user.chat.push({ content: message });

      // send all chats with new one to openAI API
      const config = configureOpenAI();
      const openai = new OpenAI(config);
      // get latest response
      const chatResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: chat,
      });
      user.chat.push(chatResponse.data.choices[0].message);
      await user.save();
      return res.status(200).json({ chats: user.chat });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }

}

async function allChats (req,res,next){
    try {
    const user = await User.findById(req.userId); // Fetch user using userId
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" ,chats: user.chats});
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
}

async function deleteChat (req,res,next){
    try {
        const user = await User.findById(req.userId); // Fetch user using userId
        if (!user) {
          return res.status(401).send("User not registered OR Token malfunctioned");
        }
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
      } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
      }
}

module.exports = {newChat, allChats, deleteChat}