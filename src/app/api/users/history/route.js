import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function GET() {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);

  if (!user) return new Response('Unauthorized', { status: 401 });

  const dbUser = await User.findById(user._id)
    .populate('likedVideos', 'title videoUrl thumbnailUrl')
    .populate('commentedVideos', 'title videoUrl thumbnailUrl')
    .lean();

  return new Response(JSON.stringify({
    liked: dbUser.likedVideos || [],
    commented: dbUser.commentedVideos || []
  }), { status: 200 });
}
