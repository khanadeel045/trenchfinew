// /app/api/admin/analytics/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const userData = await getUserStats();
  const revenueData = await getRevenueStats();
  return NextResponse.json({ userData, revenueData });
}
