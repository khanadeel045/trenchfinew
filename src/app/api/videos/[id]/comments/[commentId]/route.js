// /src/app/api/videos/[id]/comments/[commentId]/route.js
import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

async function currentUser() {
  const store = await cookies();
  const token = store.get('token')?.value || '';
  return verifyToken(token);
}

/* ── PATCH (edit) ─────────────────────────── */
export async function PATCH(request, context) {
  const { id: videoId, commentId } = await context.params;
  const user = await currentUser();
  if (!user?._id && !user?.id)
    return Response.json({ message: 'Login required' }, { status: 401 });

  const { text } = await request.json();
  if (!text?.trim())
    return Response.json({ message: 'Comment empty' }, { status: 400 });

  await connectToDatabase();

  const video = await Video.findById(videoId);
  if (!video) return Response.json({ message: 'Video not found' }, { status: 404 });

  const comment = video.comments.id(commentId);
  if (!comment)
    return Response.json({ message: 'Comment not found' }, { status: 404 });

  if (String(comment.userId) !== String(user._id || user.id))
    return Response.json({ message: 'Unauthorized' }, { status: 403 });

  comment.text      = text;
  comment.updatedAt = new Date();
  await video.save();

  await video.populate('comments.userId', 'username');   // ← parent populate
  const updated = video.comments.id(commentId);

  return Response.json(updated);
}


/* ── DELETE (remove) ───────────────────────── */
export async function DELETE(_req, context) {
  const { id: videoId, commentId } = await context.params;
  const user = await currentUser();
  if (!user?._id && !user?.id)
    return Response.json({ message: 'Login required' }, { status: 401 });

  await connectToDatabase();

  const video = await Video.findById(videoId);
  if (!video) return Response.json({ message: 'Video not found' }, { status: 404 });

  const comment = video.comments.id(commentId);
  if (!comment)
    return Response.json({ message: 'Comment not found' }, { status: 404 });

  if (String(comment.userId) !== String(user._id || user.id))
    return Response.json({ message: 'Unauthorized' }, { status: 403 });

  comment.remove();
  await video.save();

  return Response.json({ success: true });
}
