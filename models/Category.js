const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String
    },
    subcategories: []
});

module.exports = category = mongoose.model('category', CategorySchema);