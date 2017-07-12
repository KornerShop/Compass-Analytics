import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
  office: {
    type: String,
    required: true
  },
},{timestamps: true});

module.exports = mongoose.model('office', OfficeSchema);
