// app/upload-dir/[...path]/route.js
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(request, context) {
  const { path: segments } = await context.params;  // ✅ await params

  const filePath = path.join(process.cwd(), 'upload_dir', ...segments);

  try {
    const data = await fs.readFile(filePath);
    const contentType = mime.getType(filePath) || 'application/octet-stream';
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    return new Response('Not found', { status: 404 });
  }
}
