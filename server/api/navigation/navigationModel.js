import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NavigationSchema = new Schema({
  navigation: {
    type: Boolean,
    required: true
  },
  {timestamps: true}
});

module.exports = mongoose.model('navigation', NavigationSchema);
