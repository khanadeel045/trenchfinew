import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '../../utils/auth';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  console.log("🔑 Token from cookie:", token);

  if (!token) {
    console.log("⛔ No token found. Redirecting...");
    redirect('/login');
  }

  const decoded = verifyToken(token);
  console.log("✅ Decoded token:", decoded);

  if (!decoded) {
    console.log("❌ Token verification failed. Redirecting...");
    redirect('/login');
  }

  await connectToDatabase();
  const user = await User.findById(decoded.id).select('email name');

  if (!user) {
    console.log("🚫 User not found in DB. Redirecting...");
    redirect('/login');
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Your Email: {user.email}</p>

      {/* ✅ Logout Button */}
      <form action="/api/logout" method="POST">
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </form>
    </div>
  );

}
