import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../utils/auth';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
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

    const { currentPassword, newPassword } = await req.json();
    await connectToDatabase();
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('❌ /api/change-password error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
