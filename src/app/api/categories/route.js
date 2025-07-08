import connectToDatabase from '@/lib/mongodb';
import Category from '@/models/Category';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function GET(request) {
  await connectToDatabase();
  const cats = await Category.find().sort('name');
  return new Response(JSON.stringify(cats), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  await connectToDatabase();

  // 1) Auth + Admin check
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user = verifyToken(token);
  if (!user || user.role !== 'admin') {
    return new Response('Not authorized', { status: 403 });
  }

  // 2) JSON body parse
  const { name, slug } = await request.json();
  if (!name || !slug) {
    return new Response('Name aur Slug required hain', { status: 400 });
  }

  // 3) Create category
  const exists = await Category.findOne({ slug });
  if (exists) {
    return new Response('Slug already exists', { status: 409 });
  }

  const cat = await Category.create({ name, slug });
  return new Response(JSON.stringify(cat), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
