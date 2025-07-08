// /src/app/api/blogs/[id]/route.js
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = params;
  
  // Auth
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const decoded = verifyToken(token);
  if (!decoded?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  // Parse formData
  const formData = await request.formData();
  const title       = formData.get('title');
  const content     = formData.get('content');
  const category    = formData.get('category');
  const featureFile = formData.get('featureImage');

  const updateData = { title, content, category };

  // feature image naya agar aya ho
  if (featureFile && featureFile instanceof File) {
    const buffer = Buffer.from(await featureFile.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filename = `${Date.now()}-${featureFile.name}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, buffer);
    updateData.featureImage = `/uploads/${filename}`;
  }

  // Update blog
  const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const { id } = params;

  // Auth
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const decoded = verifyToken(token);
  if (!decoded?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Pehle blog dhundo
  const blog = await Blog.findById(id);
  if (!blog) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Agar featureImage set hai, to file delete karo
  if (blog.featureImage) {
    // featureImage e.g. "/uploads/{userId}/blogs/filename.ext"
    const filePath = path.join(process.cwd(), 'public', blog.featureImage);
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    } catch (err) {
      console.error('Error deleting image file:', err);
      // Continue even if unlink fails
    }
  }

  // Ab blog document delete karo
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

