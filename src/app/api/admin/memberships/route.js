import connectToDatabase from '@/lib/mongodb';
import Membership from '@/models/Membership';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

// Helper: Check admin access
async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (user?.role !== 'admin') return null;
  return user;
}

/* ─────────────── GET all memberships ─────────────── */
export async function GET() {
  await connectToDatabase();
  const list = await Membership.find().sort({ level: 1 }).lean();
  return Response.json(list);
}

/* ─────────────── POST create membership ─────────────── */
export async function POST(request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDatabase();
  const data = await request.json();

  const created = await Membership.create({
    name: data.name,
    description: data.description,
    price: data.price,
    level: data.level,
    features: data.features,
    isActive: data.isActive,
  });

  return Response.json(created);
}
