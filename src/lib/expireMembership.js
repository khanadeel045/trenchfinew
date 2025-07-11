import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function expireUserIfNeeded(userId) {
  await connectToDatabase();
  const user = await User.findById(userId);

  if (!user || !user.membershipExpiresAt) return;

  const now = new Date();
  if (now > user.membershipExpiresAt) {
    user.membership = null;
    user.membershipExpiresAt = null;
    await user.save();
  }
}
