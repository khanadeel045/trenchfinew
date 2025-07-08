// src/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  author:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },  // permalink
  content:      { type: String, required: true },
  category:     { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  featureImage: { type: String, default: '' },  // ← yeh line add karein
  attachments:  [
    {
      filename: String,
      url:      String,
      mimeType: String,
      size:     Number
    }
  ]
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
