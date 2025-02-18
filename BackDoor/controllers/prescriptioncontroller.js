import Prescription from '../models/prescription.js';

export async function addPrescription(req, res) {
  try {
    const { patientId, doctorId, medications, notes } = req.body;
    const newPrescription = new Prescription({ patientId, doctorId, medications, notes });
    await newPrescription.save();
    res.json({ message: 'Prescription added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add prescription' });
  }
}