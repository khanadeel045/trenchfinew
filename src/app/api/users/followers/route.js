import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function GET() {
  await connectToDatabase();
  const store = await cookies();
  const token = store.get('token')?.value || '';
  const me = verifyToken(token);
  if (!me?._id) return new Response('Login required', { status: 401 });

  // load my document with followers populated
  const user = await User.findById(me._id)
    .populate('followers', 'username profileImage')
    .lean();
  return new Response(JSON.stringify(user.followers), { status: 200 });
}
