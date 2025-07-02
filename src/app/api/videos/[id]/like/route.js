// /src/app/api/videos/[id]/like/route.js
import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function POST(request, context) {
  /* ─ await params.id ─ */
  const { id: videoId } = await context.params;

  await connectToDatabase();

  /* ─ await cookies() ─ */
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user  = verifyToken(token);

  if (!user?._id && !user?.id) {
    return Response.json({ message: 'Login required' }, { status: 401 });
  }
  const userId = String(user._id || user.id);

  /* ─ Toggle like ─ */
  const video = await Video.findById(videoId);
  if (!video) return new Response('Not found', { status: 404 });

  const idx   = video.likes.findIndex(id => String(id) === userId);
  const liked = idx === -1;
  liked ? video.likes.push(userId) : video.likes.splice(idx, 1);

  await video.save();
  return Response.json({ liked, likeCount: video.likes.length });
}
