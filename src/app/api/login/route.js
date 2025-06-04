// /src/app/api/login/route.js
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/auth';
import { serialize } from 'cookie';

export async function POST(request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email aur password donon zaroori hain' }), { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid email ya password' }), { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Invalid email ya password' }), { status: 401 });
  }

  const token = signToken(user);
  const cookieHeader = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: { 'Set-Cookie': cookieHeader, 'Content-Type': 'application/json' },
  });
}
