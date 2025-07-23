const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 10000;

// ✅ Enable CORS for GitHub Pages
app.use(cors({
  origin: 'https://aliv7124.github.io',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('iNotebook backend running');
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});



