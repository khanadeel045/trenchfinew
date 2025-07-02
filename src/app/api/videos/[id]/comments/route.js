// /src/app/api/videos/[id]/comments/route.js
import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

/* ── GET latest 50 ── */
export async function GET(_req, context) {
  const { id: videoId } = await context.params;
  await connectToDatabase();

  const video = await Video.findById(videoId)
    .select('comments')
    .populate('comments.userId', 'username')
    .lean();

  if (!video) return new Response('Not found', { status: 404 });
  return Response.json(video.comments.slice(-50).reverse());
}

/* ── POST new comment ── */
export async function POST(request, context) {
  const { id: videoId } = await context.params;
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user  = verifyToken(token);
  if (!user?._id && !user?.id)
    return Response.json({ message: 'Login required' }, { status: 401 });

  const { text } = await request.json();
  if (!text?.trim())
    return Response.json({ message: 'Comment empty' }, { status: 400 });

  const video = await Video.findByIdAndUpdate(
    videoId,
    { $push: { comments: { userId: user._id || user.id, text, createdAt: new Date() } } },
    { new: true }
  )
    .select('comments')
    .populate('comments.userId', 'username');

  if (!video) return new Response('Not found', { status: 404 });

  return Response.json(video.comments.at(-1));
}
