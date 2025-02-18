import Appointment from '../models/appointment.js';

export async function createAppointment(req, res) {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;
    const newAppointment = new Appointment({ patientId, doctorId, date, time, reason });
    await newAppointment.save();
    res.json({ message: 'Appointment scheduled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule appointment' });
  }
}
