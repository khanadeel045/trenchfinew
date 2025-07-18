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
      status: 206, // Partial Content
      headers: {
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',                      // ✅ for seek
        'Cache-Control': 'public, max-age=3600',       // ✅ optional
        'Content-Length': data.length.toString(),      // ✅ important
        'Cross-Origin-Resource-Policy': 'cross-origin' // ✅ iOS Safari fix
      },
    });
  } catch (err) {
    console.error('❌ Route error:', err);
    return new Response('Not found', { status: 404 });
  }
}
