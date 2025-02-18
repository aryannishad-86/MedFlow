import Patient from '../models/patient.js';

export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient profile' });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { name, age, address } = req.body;
    const patient = await Patient.findByIdAndUpdate(req.params.id, { name, age, address }, { new: true });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update patient profile' });
  }
};
