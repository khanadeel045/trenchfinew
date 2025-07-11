import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  price: { type: Number, required: true },
  level: { type: Number, required: true, min: 1 },
  features: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  durationValue: { type: Number, default: 1 },
  durationUnit: {
    type: String,
    enum: ['day', 'week', 'month', 'year'],
    default: 'month'
  },
  hasFreeTrial: { type: Boolean, default: false },
  freeTrialDays: { type: Number, default: 0 },
  allowedPages: { type: [String], default: [] }, // ✅ NEW: admin-controlled access
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Membership || mongoose.model('Membership', membershipSchema);
