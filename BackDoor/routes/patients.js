import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getPatientProfile, updatePatient } from '../controllers/patientcontroller.js';
import User from '../models/user.js';

const router = express.Router();

// Get patient profile
router.get('/:id', verifyToken, getPatientProfile);

// Update patient profile
router.put('/:id', verifyToken, updatePatient);

// Get patient's appointments
router.get('/:id/appointments', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Get patient appointments route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get patient's prescriptions
router.get('/:id/prescriptions', verifyToken, async (req, res) => {
    try {
        res.json({ message: "Get patient prescriptions route" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add this route for getting patient profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // Add debug logs
    console.log('Accessing /profile route');
    console.log('Request user:', req.user);
    console.log('Request headers:', req.headers);

    if (!req.user || !req.user.userId) {
      console.error('No user ID found in token');
      return res.status(401).json({ error: 'Invalid token - no user ID' });
    }

    const patient = await User.findById(req.user.userId);
    console.log('Found patient:', patient); // Debug log

    if (!patient) {
      console.error('Patient not found for ID:', req.user.userId);
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Return only necessary fields
    const patientData = {
      fullName: patient.fullName,
      email: patient.email,
      phone: patient.phone,
      role: patient.role
    };

    console.log('Sending patient data:', patientData); // Debug log
    res.json(patientData);

  } catch (err) {
    console.error('Detailed server error:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ 
      error: 'Failed to fetch patient profile', 
      details: err.message 
    });
  }
});

export default router;
