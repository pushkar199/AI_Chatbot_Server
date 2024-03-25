const jwt = require("jsonwebtoken");
const User = require("../model/user");
require('dotenv').config()

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Authorization header
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports =  authenticateToken ;
