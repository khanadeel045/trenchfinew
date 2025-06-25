'use server';
import Header from '@/components/Header'; // make sure exists
import Footer from '@/components/Footer'; // make sure exists

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminPage() {
  const token = (await cookies()).get('token')?.value;
  console.log('🧪 Token:', token); // ✅ Log the token

  if (!token) {
    console.log('❌ No token found');
    redirect('/login');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded token:', decoded);

    if (decoded.role !== 'admin') {
      console.log('⛔ Not admin:', decoded.role);
      redirect('/');
    }
  } catch (err) {
    console.log('❌ JWT error:', err.message);
    redirect('/');
  }

  return (

    <>
    <Header /> {/* ✅ Global Header */}

    <div className="p-6  pt-30">
      <h1 className="text-3xl font-bold">Welcome Admin</h1>
      <ul>
        <li><Link href="/admin/users">Manage Users</Link></li>
        <li><Link href="/admin/badges">Badge Requests</Link></li>
      </ul>
    </div>

    <Footer /> {/* ✅ Global Footer */}

    </>

  );
}
