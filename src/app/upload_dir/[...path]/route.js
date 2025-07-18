// app/upload-dir/[...path]/route.js
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(request, context) {
  const { path: segments } = await context.params;

  const filePath = path.join(process.cwd(), 'upload_dir', ...segments);

  try {
    const data = await fs.readFile(filePath);
    const contentType = mime.getType(filePath) || 'application/octet-stream';

    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',              // ✅ iOS requires this for seek
        'Cache-Control': 'public, max-age=3600', // ✅ optional, improve delivery
        'Content-Length': data.length.toString(), // ✅ ensures proper video streaming
      },
    });
  } catch (err) {
    console.error('❌ File Read Error:', err);
    return new Response('Not found', { status: 404 });
  }
}
