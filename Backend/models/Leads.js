const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    // enum: ['HOMELOAN', 'LAP', 'CAR', 'PERSONALLOAN', 'INSURANCE'],
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  contactDate: {
    type: Date,
  },
  contactTime: {
    type: String,
  },
  remarks: {
    type: String,
    default: "",
  },
  statusn: {
    type: Number,
    default: 0,
  },
  bankName: {
    type: String,
    default: "",
  },
  Month: {
    type: String,
    default: "MAY",
  },
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
