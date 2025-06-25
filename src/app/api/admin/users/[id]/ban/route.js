// /src/app/api/admin/users/[id]/ban/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req, { params }) {
  const userId = params.id;

  await connectToDatabase();

  const user = await User.findByIdAndUpdate(userId, { isBanned: true });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'User banned successfully' }), { status: 200 });
}
