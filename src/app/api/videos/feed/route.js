import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function GET() {
  await connectToDatabase();

  /* ── Auth ─ */
  const cookieStore = await cookies();          // await zaroori hai
  const token = cookieStore.get('token')?.value || '';
  const user  = verifyToken(token);
  const myId  = user?._id || user?.id ? String(user._id || user.id) : null;

  /* ── Visibility query ─ */
  const query = myId
    ? { $or: [{ isPrivate: false }, { userId: myId }] }
    : { isPrivate: false };

  /* ── Fetch basic fields ─ */
  const raw = await Video.find(query)
    .sort({ createdAt: -1 })
    .populate('userId', 'username')            // sirf username
    .select('title description videoUrl thumbnailUrl createdAt userId likes comments')
    .lean();

  /* ── Map into lightweight objects ─ */
  const videos = raw.map(v => ({
    _id          : v._id,
    title        : v.title,
    description  : v.description,
    videoUrl     : v.videoUrl,
    thumbnailUrl : v.thumbnailUrl,
    createdAt    : v.createdAt,
    userId       : v.userId,                       // { _id, username }
    likeCount    : (v.likes ?? []).length,         // ← safe
    commentCount : (v.comments ?? []).length,      // ← safe
    likedByMe    : myId ? (v.likes ?? []).some(id => String(id) === myId) : false,
  }));

  return Response.json(videos);
}
