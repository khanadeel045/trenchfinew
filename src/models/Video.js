// models/Video.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]

});

export default mongoose.models.Video || mongoose.model('Video', videoSchema);

