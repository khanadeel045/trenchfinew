// /src/app/api/blogs/route.js

import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
// ensure User aur Category schemas register hoon:
import '@/models/User';
import '@/models/Category';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';
import fs from 'fs';
import path from 'path';

// Slugify helper
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

// Ensure slug unique
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let count = 0;
  while (await Blog.findOne({ slug })) {
    count += 1;
    slug = `${baseSlug}-${count}`;
  }
  return slug;
}

export const config = { api: { bodyParser: false } };

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find()
      .populate('author', 'username')
      .populate('category', 'name slug')  // category.slug bhi chahiye
      .lean();                             // plain JS object with slug
    return NextResponse.json(blogs);
  } catch (err) {
    console.error('❌ GET /api/blogs error:', err);
    return NextResponse.json(
      { error: 'Server error fetching blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    // Auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ error: 'Login required' }, { status: 401 });
    }
    const userId = decoded.id;

    // Parse form data
    const formData = await request.formData();
    const title       = formData.get('title')?.toString().trim();
    let   slugInput   = formData.get('slug')?.toString().trim();
    const content     = formData.get('content')?.toString().trim();
    const category    = formData.get('category')?.toString().trim();
    const featureFile = formData.get('featureImage');

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category required' },
        { status: 400 }
      );
    }

    // Slug logic: auto-generate if not provided
    const base = slugInput ? slugify(slugInput) : slugify(title);
    const slug = await ensureUniqueSlug(base);

    // User-specific uploads folder: public/uploads/{userId}/blogs
    let featureUrl = '';
    if (featureFile && featureFile instanceof File) {
      const buffer = Buffer.from(await featureFile.arrayBuffer());
      const uploadsDir = path.join(
        process.cwd(),
        'public',
        'uploads',
        userId,
        'blogs'
      );
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filename = `${Date.now()}-${featureFile.name}`;
      await fs.promises.writeFile(path.join(uploadsDir, filename), buffer);
      featureUrl = `/uploads/${userId}/blogs/${filename}`;
    }

    // Create blog with slug
    const blog = await Blog.create({
      author:       userId,
      title,
      slug,
      content,
      category,
      featureImage: featureUrl,
      attachments:  []
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error('❌ POST /api/blogs error:', err);
    return NextResponse.json(
      { error: 'Server error creating blog' },
      { status: 500 }
    );
  }
}
