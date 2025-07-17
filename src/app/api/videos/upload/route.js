import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const description = formData.get('description');
    const isPrivate = formData.get('isPrivate') === 'true';

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const user = verifyToken(token);
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const userId = user._id || user.id;

    // **Yahan par correct public/uploads path set ho rahi hai**
    const projectRoot = process.cwd();  // e.g. /home/ubuntu/trenchfinew
    const userDir = path.join(projectRoot, 'uploads', userId);
    await mkdir(userDir, { recursive: true });

    // Slugify, timestamp, extension
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const ext = file.name.split('.').pop();
    const filename = `${slug}_${timestamp}.${ext}`;

    // Write into public/uploads/...
    const uploadPath = path.join(userDir, filename);
    await writeFile(uploadPath, buffer);

    // Save record in DB
    await connectToDatabase();
    const newVideo = await Video.create({
      userId,
      title,
      description,
      videoUrl: `/uploads/${userId}/${filename}`,
      isPrivate,
    });

    return new Response(JSON.stringify(newVideo), { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return new Response('Upload failed', { status: 500 });
  }
}
