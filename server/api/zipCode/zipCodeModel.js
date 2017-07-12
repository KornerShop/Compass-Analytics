import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ZipCodeSchema = new Schema({
  zipCode: {
    type: String,
    required: true
  },
  {timestamps: true}
});

module.exports = mongoose.model('zipCode', ZipCodeSchema);
