import { Schema, model } from 'mongoose';

const DoctorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  medicalLicenseNumber: { type: String, required: true },
  hospitalOrClinic: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }]
}, { timestamps: true });

export default model('Doctor', DoctorSchema);
