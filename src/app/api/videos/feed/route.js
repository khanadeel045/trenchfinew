import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function GET() {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);

  let query = {};

  if (user?._id || user?.id) {
    // ✅ Show all videos of the user + public videos
    query = {
      $or: [
        { isPrivate: false },
        { userId: user._id || user.id },
      ],
    };
  } else {
    // ✅ Show public only if no user
    query = { isPrivate: false };
  }

const videos = await Video.find({ isPrivate: false })
  .sort({ createdAt: -1 })
  .populate('userId', 'username') // 👈 populate only the name field
  .lean();

  return new Response(JSON.stringify(videos), { status: 200 });
}
