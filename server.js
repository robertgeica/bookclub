const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./config/db');
const path = require('path');
const fileUpload = require('express-fileupload');

// connect database
connectDb();

// apply middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: false }));
app.use(express.static('public'));

// routes
app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/books', require('./routes/api/books'));
app.use('/api/fileupload', require('./routes/api/fileupload'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});