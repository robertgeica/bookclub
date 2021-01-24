const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rating: [],
  category: [
    {
      categoryId: {
        type: Object,
        required: true,
      },
    },
  ],
  subcategories: [],
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  language: {
    type: String,
  },
  pages: {
    type: Number,
  },
  format: {
    type: String,
  },
  fileName: {
    type: String,
  },
  isbn: {
    type: String,
  },
});

module.exports = Book = mongoose.model("book", BookSchema);
