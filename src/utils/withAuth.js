// /src/utils/withAuth.js  (agar Zaroorat ho)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from './auth';

export async function requireAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  if (!token) redirect('/login');

  const decoded = verifyToken(token);
  if (!decoded) redirect('/login');

  return decoded; // { _id, email, iat, exp }
}
