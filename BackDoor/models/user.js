import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['patient', 'doctor'],
    required: true
  },
  specialization: String,
  licenseNumber: String,
  hospitalClinic: String
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
