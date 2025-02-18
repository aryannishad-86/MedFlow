const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    // Check if user exists
    let patient = await Patient.findOne({ email });
    if (patient) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new patient
    patient = new Patient({
      fullName,
      email,
      password,
      phone,
      role
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);

    // Save patient
    await patient.save();

    // Create token
    const token = jwt.sign(
      { id: patient._id, role: patient.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: patient._id, role: patient.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 