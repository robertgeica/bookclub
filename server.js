const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db');
const path = require('path');

// connect database
connectDb();

// apply middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static('public'));

// routes


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});