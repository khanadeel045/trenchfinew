// /app/api/logout/route.js
import { serialize } from 'cookie';

export async function POST() {
  // Token cookie expire karke hata dena:
  const cookieHeader = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });

  return new Response(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: {
      'Set-Cookie': cookieHeader,
      'Content-Type': 'application/json',
    },
  });
}
