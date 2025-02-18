import { Schema, model } from 'mongoose';

const PatientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medicalHistory: { type: Array, default: [] },
  prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Prescription' }],
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
}, { timestamps: true });

export default model('Patient', PatientSchema);
