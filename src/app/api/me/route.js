import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '../../../utils/auth';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Membership from '@/models/Membership'; // 👈 Required for populate to work

export async function GET(req) {
  try {
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

    // ✅ Auto-expire if past due
    const userToCheck = await User.findById(decoded.id);
    if (userToCheck?.membershipExpiresAt && new Date() > userToCheck.membershipExpiresAt) {
      userToCheck.membership = null;
      userToCheck.membershipExpiresAt = null;
      await userToCheck.save();
    }

    const user = await User.findById(decoded.id)
      .select('name email dob language country timezone profileImage followers following username membership membershipExpiresAt')
      .populate('membership')
      .populate('followers', '_id name username profileImage')
      .populate('following', '_id name username profileImage')
      .lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      dob: user.dob || '',
      language: user.language || '',
      country: user.country || '',
      timezone: user.timezone || '',
      profileImage: user.profileImage || '',
      followers: user.followers,
      following: user.following,
      membership: user.membership || null,
      membershipExpiresAt: user.membershipExpiresAt || null,
    });

  } catch (error) {
    console.error('❌ /api/me error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
