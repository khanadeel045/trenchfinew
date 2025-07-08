// src/app/api/users/[id]/unfollow/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function DELETE(_req, { params }) {
  await connectToDatabase();

  const cookieStore = await cookies();                      // :contentReference[oaicite:1]{index=1}
  const token       = cookieStore.get('token')?.value || '';
  const user        = verifyToken(token);
  if (!user?._id && !user?.id) {
    return new Response('Login required', { status: 401 });
  }

  const myId     = String(user._id || user.id);
  const targetId = params.id;

  // unfollow
  await User.findByIdAndUpdate(myId,     { $pull: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $pull: { followers: myId } });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
