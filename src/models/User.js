import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  username: { type: String, required: true, trim: true },
  wallet: { type: String, default: '' },
  isBanned: { type: Boolean, default: false },

  profileImage: { type: String, default: '' },
  dob: { type: String, default: '' },
  language: { type: String, default: '' },
  country: { type: String, default: '' },
  timezone: { type: String, default: '' },

  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
