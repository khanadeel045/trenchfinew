// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_ROLE = 'admin'; // ya specific wallet/email/flag as per your schema

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log('🪙 Token:', token);

  if (!token) {
    console.log('🚫 No token found, redirecting...');
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    if (decoded.role !== ADMIN_ROLE) {
      console.log('⛔ User not admin, redirecting...');
      return NextResponse.redirect(new URL('/', req.url));
    }

    console.log('🎉 Access granted to admin');
    return NextResponse.next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    return NextResponse.redirect(new URL('/', req.url));
  }
}


// middleware.js
export const config = {
  matcher: [], // 👈 Disable middleware for now
};
