import { Schema, model } from 'mongoose';

const MedicalReportSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  reportData: { type: Object, required: true },
  flagged: { type: Boolean, default: false }
}, { timestamps: true });

export default model('MedicalReport', MedicalReportSchema);
