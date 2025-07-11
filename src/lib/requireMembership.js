import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Membership from '@/models/Membership'; // 👈 required for populate

export async function requireMembershipAccess(path) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (!user?.id) return null;

  await connectToDatabase();

  const dbUser = await User.findById(user.id).populate('membership');

  // ❌ User not found or not subscribed
  if (!dbUser || !dbUser.membership) return null;

  // ❌ Expired
  const now = new Date();
  if (!dbUser.membershipExpiresAt || now > dbUser.membershipExpiresAt) return null;

  // ❌ Page not allowed
  const allowed = dbUser.membership.allowedPages || [];
  if (!allowed.includes(path)) return null;

  // ✅ Access granted
  return {
    _id: dbUser._id.toString(),
    name: dbUser.name,
    email: dbUser.email,
    username: dbUser.username,
    membership: dbUser.membership,
  };
}
