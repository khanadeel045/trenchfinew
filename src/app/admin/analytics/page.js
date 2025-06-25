'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with real API later
    setData([
      { date: 'Mon', users: 150, revenue: 40 },
      { date: 'Tue', users: 220, revenue: 80 },
      { date: 'Wed', users: 350, revenue: 130 },
      { date: 'Thu', users: 500, revenue: 200 },
      { date: 'Fri', users: 420, revenue: 180 },
      { date: 'Sat', users: 650, revenue: 250 },
      { date: 'Sun', users: 900, revenue: 400 },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Weekly Analytics</h2>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2">📈 User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#38bdf8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">💰 Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
