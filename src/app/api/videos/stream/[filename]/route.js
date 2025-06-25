import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), 'public/uploads', filename);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.get('range');

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    return new Response(file, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      },
    });
  }

  const file = fs.createReadStream(filePath);
  return new Response(file, {
    headers: {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    },
  });
}
