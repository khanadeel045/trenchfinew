import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import User from '@/models/User';

export async function GET(request) {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  const myId = user?._id || user?.id ? String(user._id || user.id) : null;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'my';
  const requestedUserId = searchParams.get('user'); // new addition

  let query = { isPrivate: false };

  /* 🔁 1. If ?type=following */
  if (type === 'following' && myId) {
    const currentUser = await User.findById(myId).select('following').lean();
    const followingIds = currentUser?.following?.map(f => String(f._id || f)) || [];
    const filteredFollowing = followingIds.filter(id => id !== myId);

    query = {
      userId: { $in: filteredFollowing },
      isPrivate: false,
    };
  }

  /* 👤 2. If ?user=XYZ */
  else if (requestedUserId) {
    // If viewing own profile → show all (private + public)
    if (requestedUserId === myId) {
      query = { userId: requestedUserId }; // include private
    } else {
      query = {
        userId: requestedUserId,
        isPrivate: false,
      };
    }
  }

  /* 🌐 3. Default: ?type=my → show all public + my private */
  else if (type === 'my') {
    query = myId
      ? { $or: [{ isPrivate: false }, { userId: myId }] }
      : { isPrivate: false };
  }

  const raw = await Video.find(query)
    .sort({ createdAt: -1 })
    .populate('userId', 'username profileImage')
    .select('title description videoUrl thumbnailUrl createdAt userId likes comments')
    .lean();

  const videos = raw.map(v => ({
    _id          : v._id,
    title        : v.title,
    description  : v.description,
    videoUrl     : v.videoUrl,
    thumbnailUrl : v.thumbnailUrl,
    createdAt    : v.createdAt,
    userId       : v.userId,
    likeCount    : (v.likes ?? []).length,
    commentCount : (v.comments ?? []).length,
    likedByMe    : myId ? (v.likes ?? []).some(id => String(id) === myId) : false,
  }));

  return Response.json(videos);
}
