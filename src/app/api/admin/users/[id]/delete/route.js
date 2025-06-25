// /src/app/api/admin/users/[id]/delete/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function DELETE(_, { params }) {
  const userId = params.id;

  await connectToDatabase();

  const deleted = await User.findByIdAndDelete(userId);

  if (!deleted) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
}
