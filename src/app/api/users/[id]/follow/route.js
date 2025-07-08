// src/app/api/users/[id]/follow/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function POST(_req, { params }) {
  await connectToDatabase();

  const cookieStore = await cookies();                      // :contentReference[oaicite:0]{index=0}
  const token       = cookieStore.get('token')?.value || '';
  const user        = verifyToken(token);

  // dono _id aur id check karo
  if (!user?._id && !user?.id) {
    return new Response('Login required', { status: 401 });
  }

  const myId     = String(user._id || user.id);
  const targetId = params.id;
  if (myId === targetId) {
    return new Response('Cannot follow self', { status: 400 });
  }

  // follow toggle
  await User.findByIdAndUpdate(myId,     { $addToSet: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $addToSet: { followers: myId } });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
