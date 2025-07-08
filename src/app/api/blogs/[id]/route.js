// src/app/api/blogs/[id]/route.js
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import '@/models/User';
import '@/models/Category';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function DELETE(request, { params }) {
  await connectToDatabase();

  // 1️⃣ await params
  const { id } = await params;

  // 2️⃣ Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = verifyToken(token);
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3️⃣ Delete only if author matches
  const blog = await Blog.findOneAndDelete({ _id: id, author: user.id });
  if (!blog) {
    return NextResponse.json(
      { error: 'Not found or not yours' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true });
}
