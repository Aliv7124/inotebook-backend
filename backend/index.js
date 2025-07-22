const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config(); // Make sure this is here

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});


