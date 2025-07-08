// src/app/account/following/page.js
'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FollowingPage() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          // ensure following array موجود ہو
          setMe({ ...data, following: data.following || [] });
        }
      });
  }, []);

  if (!me) return <p>Loading...</p>;

  const { following } = me;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Following</h1>

      {following.length > 0 ? (
        following.map(user => (
          <div key={user._id} className="flex items-center justify-between p-2 border rounded mb-2">
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || '/default-avatar.jpg'}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{user.username}</span>
            </div>
            <button
              onClick={async () => {
                const res = await fetch(`/api/users/${user._id}/unfollow`, { method: 'DELETE' });
                if (res.ok) {
                  toast.success('Unfollowed');
                  setMe(prev => ({
                    ...prev,
                    following: prev.following.filter(u => u._id !== user._id)
                  }));
                } else {
                  toast.error('Unfollow failed');
                }
              }}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Unfollow
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">You have no Following.</p>
      )}
    </div>
  );
}
