import { Schema, model } from 'mongoose';

const PrescriptionSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medications: [{ name: String, dosage: String, frequency: String }],
  notes: { type: String }
}, { timestamps: true });

export default model('Prescription', PrescriptionSchema);
