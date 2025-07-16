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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const userId = user._id || user.id;
    const uploadsRoot = path.join('/app/public/uploads');
    const userDir = path.join(uploadsRoot, userId);
    await mkdir(userDir, { recursive: true });

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const ext = file.name.split('.').pop();
    const filename = `${slug}_${timestamp}.${ext}`;

    const uploadPath = path.join(userDir, filename);
    await writeFile(uploadPath, buffer);

    await connectToDatabase();

    const newVideo = await Video.create({
      userId,
      title,
      description,
      // ✅ Dynamic API path so no need to redeploy
      videoUrl: `/api/uploads/${userId}/${filename}`,
      isPrivate,
    });

    return new Response(JSON.stringify(newVideo), { status: 200 });
  } catch (err) {
    console.error('Upload error:', err);
    return new Response('Upload failed', { status: 500 });
  }
}
