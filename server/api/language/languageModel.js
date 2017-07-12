import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  lang: {
    type: String,
    required: true
  },
  {timestamps: true}
});

module.exports = mongoose.model('language', LanguageSchema);
