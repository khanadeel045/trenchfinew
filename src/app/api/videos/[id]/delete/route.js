import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(_, { params }) {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const video = await Video.findById(params.id);

  if (!video) {
    return new Response('Video not found', { status: 404 });
  }

  if (video.userId.toString() !== user._id && video.userId.toString() !== user.id) {
    return new Response('Forbidden', { status: 403 });
  }

  // ✅ Delete video file from disk
  try {
    const filePath = path.join(process.cwd(), 'public', video.videoUrl);
    await unlink(filePath);
    console.log('✅ File deleted:', filePath);
  } catch (err) {
    console.warn('⚠️ Failed to delete video file:', err.message);
  }

  // ✅ Delete from MongoDB
  await Video.findByIdAndDelete(params.id);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
