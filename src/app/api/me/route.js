// /src/app/api/me/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../utils/auth';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(req) {
  try {
    // await ka khayal rakhein
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(decoded.id)
      .select('name email dob language country timezone profileImage followers following username')
      .populate('followers', '_id name username profileImage')
      .populate('following', '_id name username profileImage')
      .lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id:          user._id.toString(),
      name:         user.name,
      email:        user.email,
      username:     user.username,
      dob:          user.dob || '',
      language:     user.language || '',
      country:      user.country || '',
      timezone:     user.timezone || '',
      profileImage: user.profileImage || '',
      followers:    user.followers,
      following:    user.following,
    });
  } catch (error) {
    console.error('❌ /api/me error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
