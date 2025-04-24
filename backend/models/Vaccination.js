import mongoose from 'mongoose';

const vaccinationSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  vaccinationDate: { type: Date, required: true },
  nextVaccinationDate: { type: Date, required: true },
  petWeight: { type: Number, required: true },
  petBreed: { type: String, required: true },
  // Add reference to User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Vaccination', vaccinationSchema);