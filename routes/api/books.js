const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');
const Category = require('../../models/Category');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /book
// @description     Test route
router.get('/', async (req, res) => {
  try {
    const book = await Book.find();

    res.send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

// @route           GET /book/:id
// @description     Test route
router.get('/:id', async (req, res) => {
  try {
    
    let id = await req.params.id;
    const book = await Book.findById(id);

    res.json(book);
  } catch (error) {
    res.status(400).send('error getting book');
  }
});

// @route           POST /book
// @description     Add a book
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(user.role !== 'admin') return res.status(401).send('Not allowed!');


    const book = await Book(req.body);
    book.save();
    res.status(200).send('New book added successfully.');
  } catch (error) {
    res.status(400).send('Error adding new book.')
  }
});

// @route           DELETE /book/:id
// @description     Delete a book
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(user.role !== 'admin') return res.status(401).send('Not allowed!');
    let id = await req.params.id;

    const book = await Book.findByIdAndDelete({ _id: id });
    
    res.send(book);
  } catch (error) {
    res.status(400).send('Error deleting a book.');
    
  }
});

// @route           PUT /book/:id
// @description     Update a book
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(user.role !== 'admin') return res.status(401).send('Not allowed!');
    let book = await Book.findById(req.params.id);

    if (!book) res.status(404).send('no book to update');
    book.title = req.body.title;    
    book.author = req.body.author;
    book.rating = req.body.rating;
    book.category = req.body.category;
    book.subcategories = req.body.subcategories;
    book.description = req.body.description;
    book.imageUrl = req.body.imageUrl;
    book.language = req.body.language;
    book.pages = req.body.pages;
    book.format = req.body.format;
    book.fileName = req.body.fileName;
    book.isbn = req.body.isbn;

    
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(400).send('Error editing the book');
  }
});

module.exports = router;