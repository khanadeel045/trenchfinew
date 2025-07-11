import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Membership from '@/models/Membership';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (!user?._id && !user?.id)
    return Response.json({ message: 'Login required' }, { status: 401 });

  const { membershipId } = await request.json();
  await connectToDatabase();

  const plan = await Membership.findById(membershipId);
  if (!plan || !plan.isActive)
    return Response.json({ message: 'Invalid membership' }, { status: 400 });

  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1); // 1 month

  const updated = await User.findByIdAndUpdate(user._id || user.id, {
    membership: membershipId,
    membershipExpiresAt: expires,
  });

  return Response.json({ success: true });
}
