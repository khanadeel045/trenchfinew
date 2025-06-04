// /app/dashboard/page.js
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '../../utils/auth';
import connectToDatabase from '../../lib/mongodb';
import User from '../../models/User';

export default async function DashboardPage() {
  // 1) Cookie se token nikalna:
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  // 2) Agar token na ho to login par bhej do:
  if (!token) {
    redirect('/login');
  }

  // 3) Token verify karna:
  const decoded = verifyToken(token);
  if (!decoded) {
    redirect('/login');
  }

  // 4) Optionally user details fetch karna agar zaroorat ho:
  await connectToDatabase();
  const user = await User.findById(decoded._id).select('email name');

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-4">Aapka email: {user.email}</p>
      {/* Yahan dashboard ka content rakh sakte hain */}
      <div className="mt-6">
        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
