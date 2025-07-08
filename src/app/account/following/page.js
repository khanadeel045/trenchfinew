'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FollowingPage() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch('/api/me').then(res => res.ok && res.json()).then(setMe);
  }, []);

  if (!me) return <p>Loading...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Following</h1>
      {me.following.map(user => (
        <div key={user._id} className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center gap-3">
            <img src={user.profileImage} className="w-8 h-8 rounded-full" />
            <span>{user.username}</span>
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
              }
            }}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Unfollow
          </button>
        </div>
      ))}
      {me.following.length === 0 && <p className="text-gray-500">Koi followings nhi hain.</p>}
    </div>
  );
}
