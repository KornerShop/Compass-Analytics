const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NavigationSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  office: {
    type: String,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model('navigation', NavigationSchema);
