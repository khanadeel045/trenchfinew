import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Membership from '@/models/Membership';

export async function requireMembershipAccess(path) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (!user?.id) return null;

  await connectToDatabase();

  const dbUser = await User.findById(user.id).populate('membership');
  if (!dbUser || !dbUser.membership || !dbUser.membershipExpiresAt) return null;

  const now = new Date();
  if (now > dbUser.membershipExpiresAt) return null;

  const allowed = dbUser.membership.allowedPages || [];
  if (!allowed.includes(path)) return null;

  return {
    _id: dbUser._id.toString(),
    name: dbUser.name,
    username: dbUser.username,
    membership: dbUser.membership,
  };
}
