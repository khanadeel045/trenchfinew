import connectToDatabase from '@/lib/mongodb';
import Video from '@/models/Video';

export async function PUT(req, { params }) {
  await connectToDatabase();
  const body = await req.json();

  const updated = await Video.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}
