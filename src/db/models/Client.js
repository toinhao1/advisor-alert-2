const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creat Schema
const ClientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  identifier: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model('clients', ClientSchema);
