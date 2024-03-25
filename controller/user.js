const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require ("jsonwebtoken");
require('dotenv').config()


async function getUsers (req,res){
    try {
        const users = await User.find();
        return res.status(200).json({message: "OK", users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Error', cause:  error.message})
    }
}


async function signUp (req,res){
    try {
        const {name, email, password} = req.body
        const existingUser = await User.find({email: email});
        if (existingUser.length > 0) {
            return res.status(401).send('User already exists');
        }
        if(password.length<6) return res.status(401).send('Password should have atleast 6 characters')
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User ({ name: name, email: email, password: hashedPassword});
        await user.save();
        //Generate and send token
        const payload = {id: user._id, email: user.email}
        let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'3h'})
        return res.status(201).header("auth-token",token).json({"Message":"Sign Up Successfully!"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Error', cause:  error.message})
    }
}



async function login (req,res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user) return res.status(401).send("User not registered");
        const validPassowrd = await bcrypt.compare(password, user.password)
        if(!validPassowrd) return res.status(401).send("Invalid Password")
        //Send Token
        const payload = { id : user._id,  email: user.email};
        let token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'3h'})
        res.status(200).header("auth-token",token).json({ message:"Logged In Succesfully!", token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Error', cause:  error.message})
    }
}


module.exports={getUsers, signUp, login}