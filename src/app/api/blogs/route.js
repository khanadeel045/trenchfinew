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
async function ensureUniqueSlug(base, excludeId = null) {
  let slug = base, count = 0;
  const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
  while (await Blog.findOne(query)) {
    count++;
    slug = `${base}-${count}`;
    if (excludeId) query.slug = slug;
  }
  return slug;
}

export const config = { api: { bodyParser: false } };

// ─── GET ───────────────────────────────────────────────────────────────────────
export async function GET() {
  await connectToDatabase();
  try {
    const blogs = await Blog.find()
      .select('title slug content featureImage author category')
      .populate('author', 'username')
      .populate('category', 'name slug')
      .lean();
    return NextResponse.json(blogs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Fetch error' }, { status: 500 });
  }
}

// ─── POST ──────────────────────────────────────────────────────────────────────
export async function POST(request) {
  await connectToDatabase();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const user = verifyToken(token);
    if (!user?.id) return NextResponse.json({ error: 'Login required' }, { status: 401 });

    const fd = await request.formData();
    const title    = fd.get('title')?.toString().trim();
    const slugIn   = fd.get('slug')?.toString().trim();
    const content  = fd.get('content')?.toString().trim();
    const cat      = fd.get('category')?.toString().trim();
    const fileObj  = fd.get('featureImage');

    if (!title || !content || !cat) {
      return NextResponse.json({ error: 'Title, slug, content, category required' }, { status: 400 });
    }

    // Slug
    const baseSlug = slugIn ? slugify(slugIn) : slugify(title);
    const slug     = await ensureUniqueSlug(baseSlug);

    // Image
    let featureUrl = '';
    if (fileObj && typeof fileObj.arrayBuffer === 'function') {
      const buf = Buffer.from(await fileObj.arrayBuffer());
      const dir = path.join(process.cwd(), 'upload_dir', user.id, 'blogs');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const fn = `${Date.now()}-${fileObj.name}`;
      await fs.promises.writeFile(path.join(dir, fn), buf);
      featureUrl = `/upload_dir/${user.id}/blogs/${fn}`;
    }

    console.log('Creating blog with slug:', slug);
    const blog = await Blog.create({
      author:       user.id,
      title,
      slug,
      content,
      category:     cat,
      featureImage: featureUrl,
      attachments:  []
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (e) {
    console.error('POST error:', e);
    return NextResponse.json({ error: 'Creation error' }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Auth
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const decoded = verifyToken(token);
    if (!decoded?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const title       = formData.get('title')?.toString().trim();
    let   slugInput   = formData.get('slug')?.toString().trim();
    const content     = formData.get('content')?.toString().trim();
    const category    = formData.get('category')?.toString().trim();
    const featureFile = formData.get('featureImage');

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Title, content, and category required' }, { status: 400 });
    }

    // Existing blog
    const existing = await Blog.findById(id);
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Slug logic (exclude self)
    const base = slugInput ? slugify(slugInput) : slugify(title);
    const slug = await ensureUniqueSlug(base, id);

    // Prepare update
    const updateData = { title, slug, content, category };

    // New feature image?
    if (featureFile && typeof featureFile.arrayBuffer === 'function') {
      // delete old image
      if (existing.featureImage) {
        const oldPath = path.join(process.cwd(), 'public', existing.featureImage);
        if (fs.existsSync(oldPath)) await fs.promises.unlink(oldPath);
      }
      // save new
      const buffer = Buffer.from(await featureFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), 'upload_dir', decoded.id, 'blogs');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${featureFile.name}`;
      await fs.promises.writeFile(path.join(uploadsDir, filename), buffer);
      updateData.featureImage = `/upload_dir/${decoded.id}/blogs/${filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error('❌ PUT /api/blogs error:', err);
    return NextResponse.json({ error: 'Server error updating blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Auth
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const decoded = verifyToken(token);
    if (!decoded?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Delete image
    if (blog.featureImage) {
      const filePath = path.join(process.cwd(), 'public', blog.featureImage);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ DELETE /api/blogs error:', err);
    return NextResponse.json({ error: 'Server error deleting blog' }, { status: 500 });
  }
}
