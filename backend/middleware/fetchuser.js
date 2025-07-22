
/*
const jwt = require('jsonwebtoken');
const JWT_secret = "aliv is a coder";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  
  // ✅ Always return after sending response to avoid multiple sends
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const JWT_secret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Received token:", token); // DEBUG

  if (!token) {
    return res.status(401).send({ error: "Token missing" });
  }

  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    console.log(" Decoded user:", req.user); // DEBUG
    next();
  } catch (error) {
    console.error(" JWT verification failed:", error.message); // DEBUG
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser;

*/
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ error: "Token missing" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
