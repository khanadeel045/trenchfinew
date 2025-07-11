import connectToDatabase from '@/lib/mongodb';
import Membership from '@/models/Membership';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (user?.role !== 'admin') return null;
  return user;
}

/* ─────────────── PATCH update ─────────────── */
export async function PATCH(request, context) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await context.params;
  await connectToDatabase();
  const updates = await request.json();

  const updated = await Membership.findByIdAndUpdate(id, updates, { new: true });
  return Response.json(updated);
}

/* ─────────────── DELETE ─────────────── */
export async function DELETE(_, context) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await context.params;

  await connectToDatabase();
  await Membership.findByIdAndDelete(id);
  return Response.json({ success: true });
}
