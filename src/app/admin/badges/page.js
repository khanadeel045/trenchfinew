'use client';

import { useEffect, useState } from 'react';

export default function BadgeRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/admin/badges')
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const handleDecision = async (id, decision) => {
    await fetch(`/api/admin/badges/${id}/${decision}`, { method: 'POST' });
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status: decision } : r
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🏅 Badge Requests</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Wallet</th>
            <th className="py-2 px-4">Reason</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="border-t">
              <td className="py-2 px-4">{req.username}</td>
              <td className="py-2 px-4">{req.wallet}</td>
              <td className="py-2 px-4">{req.reason}</td>
              <td className="py-2 px-4 capitalize">{req.status}</td>
              <td className="py-2 px-4 space-x-2">
                {req.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleDecision(req._id, 'approved')}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(req._id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
