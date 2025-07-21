const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aliv is a coder';

// Create User
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: secPass });

    const data = { user: { id: user.id } };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Invalid credentials' });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const data = { user: { id: user.id } };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;





