const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'clients'
  },
  stock: {
    type: String,
    required: true
  },
  currentPrice: {
    type: String,
    required: true
  },
  alertPrice: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Alert = mongoose.model('alerts', AlertSchema);
