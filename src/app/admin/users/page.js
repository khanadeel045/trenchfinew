'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header'; // make sure exists
import Footer from '@/components/Footer'; // make sure exists

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const toggleBan = async (userId, isBanned) => {
    const res = await fetch(`/api/admin/users/${userId}/${isBanned ? 'unban' : 'ban'}`, {
      method: 'POST',
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isBanned: !isBanned } : user
        )
      );
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/users/${userId}/delete`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    }
  };

  return (
    <>
      <Header /> {/* ✅ Global Header */}
        <div className="max-w-7xl mx-auto  p-6  pt-30">
          <h2 className="text-2xl font-semibold mb-4">👥 User Management</h2>
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Wallet</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.wallet}</td>
                  <td className="py-2 px-4">
                    {user.isBanned ? (
                      <span className="text-red-500">Banned</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => toggleBan(user._id, user.isBanned)}
                      className={`px-3 py-1 rounded ${
                        user.isBanned
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {user.isBanned ? 'Unban' : 'Ban'}
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <Footer /> {/* ✅ Global Footer */}
    </>
  );
}
