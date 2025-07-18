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


export async function PUT(request, { params }) {
  await connectToDatabase();

  const { id } = params;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title')?.toString().trim();
  const slug = formData.get('slug')?.toString().trim();
  const content = formData.get('content')?.toString().trim();
  const category = formData.get('category')?.toString().trim();

  if (!title || !content || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const updated = await Blog.findByIdAndUpdate(
    id,
    { title, slug, content, category },
    { new: true }
  );

  return NextResponse.json(updated);
}
