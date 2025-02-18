import Doctor from '../models/doctor.js';

// Get doctor profile
export async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor profile' });
  }
}

// Update doctor profile
export async function updateDoctor(req, res) {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update only the fields provided in the request
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update doctor profile' });
  }
}
