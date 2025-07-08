import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../utils/auth';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Enable `formData()` body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PATCH(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || '';

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectToDatabase();

    // Parse multipart form
    const formData = await req.formData();
    const name = formData.get('name');
    const dob = formData.get('dob');
    const language = formData.get('language');
    const country = formData.get('country');
    const timezone = formData.get('timezone');
    const file = formData.get('profileImage');

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.name = name || user.name;
    user.dob = dob || user.dob;
    user.language = language || user.language;
    user.country = country || user.country;
    user.timezone = timezone || user.timezone;

    // Handle profile image upload
    if (file && typeof file === 'object' && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split('.').pop();
      const fileName = `${randomUUID()}.${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      // Save image URL relative to public
      user.profileImage = `/uploads/${fileName}`;
    }

    await user.save();

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('❌ PATCH /api/user error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || '';

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Optional: remove uploaded profile image from public folder
    if (user.profileImage && user.profileImage.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', user.profileImage);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete file
      }
    }

    await User.findByIdAndDelete(user._id);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('❌ DELETE /api/user error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
