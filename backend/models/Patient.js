const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'patient' },
  // Add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema); 