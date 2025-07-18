// app/upload-dir/[...path]/route.js
import { promises as fs } from 'fs';
import path from 'path';
import mime from 'mime';

export async function GET(request, context) {
  const { path: segments } = await context.params;
  const filePath = path.join(process.cwd(), 'upload_dir', ...segments);

  try {
    const stats = await fs.stat(filePath);
    const fileSize = stats.size;
    const contentType = mime.getType(filePath) || 'application/octet-stream';

    // Get Range header from request
    const range = request.headers.get('Range');
    
    if (range) {
      // Parse range header: "bytes=start-end"
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      // Validate range
      if (start >= fileSize || end >= fileSize) {
        return new Response('Range Not Satisfiable', { 
          status: 416,
          headers: {
            'Content-Range': `bytes */${fileSize}`,
          }
        });
      }

      const chunkSize = (end - start) + 1;
      
      // Read only the requested chunk
      const buffer = Buffer.alloc(chunkSize);
      const fileHandle = await fs.open(filePath, 'r');
      await fileHandle.read(buffer, 0, chunkSize, start);
      await fileHandle.close();

      // Return partial content (206)
      return new Response(buffer, {
        status: 206, // Partial Content
        headers: {
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': chunkSize.toString(),
          'Cache-Control': 'public, max-age=3600',
          'Cross-Origin-Resource-Policy': 'cross-origin'
        },
      });
    } else {
      // No range header - return full file
      const data = await fs.readFile(filePath);
      
      return new Response(data, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
          'Content-Length': data.length.toString(),
          'Cross-Origin-Resource-Policy': 'cross-origin'
        },
      });
    }
  } catch (err) {
    console.error('❌ Route error:', err);
    return new Response('Not found', { status: 404 });
  }
}