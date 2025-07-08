// src/app/account/followers/page.js
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FollowersPage() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/me');
      if (res.ok) {
        const data = await res.json();
        setMe(data);
      }
    }
    load();
  }, []);

  if (!me) return <p>Loading...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Followers</h1>

      {me.followers.map(user => (
        <div
          key={user._id}
          className="flex items-center justify-between p-2 border rounded"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.profileImage || '/default-avatar.png'}
              alt={user.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{user.username}</span>
          </div>
          <button
            onClick={async () => {
              const res = await fetch(
                `/api/users/${user._id}/remove-follower`,
                { method: 'DELETE' }
              );
              if (res.ok) {
                toast.success('Follower removed');
                setMe(prev => ({
                  ...prev,
                  followers: prev.followers.filter(u => u._id !== user._id),
                }));
              } else {
                toast.error('Error removing follower');
              }
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      {me.followers.length === 0 && (
        <p className="text-gray-500 text-center">You don't have any follower.</p>
      )}
    </div>
  );
}
