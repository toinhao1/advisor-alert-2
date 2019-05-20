const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'clients'
  },
  stock: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Alert = mongoose.model('alerts', AlertSchema);
