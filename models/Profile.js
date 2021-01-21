const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    type: Object,
    required: true
  },
  username: {
    type: String
  },
  profileImage: {
    type: String
  },
  wishlist: [],
  readingList: [],
  readedBooks: [],
  points: {
    type: Number
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
