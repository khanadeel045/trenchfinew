
// VideoComment.js  ✅ NEW
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    videoId : { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    userId  : { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
    text    : { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

export default mongoose.models.VideoComment ||
        mongoose.model('VideoComment', commentSchema);
