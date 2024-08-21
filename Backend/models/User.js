const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  fatherName:String,
  dateOfBirth: Date,
  address: String,
  mobileNo: String,
  email: String,
  panCardNo: String,
  aadhaarCardNo: String,
  bankName: String,
  accountNo: String,
  ifscCode: String,
  gstNo: String,
  relationshipManagerCode: String,
  password: String,
  isAdmin: Boolean  
});

module.exports = mongoose.model('User', userSchema);