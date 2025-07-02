'use client';
import { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';

export default function HistoryPage() {
  const [liked, setLiked] = useState([]);
  const [commented, setCommented] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(setMe);
  }, []);

  useEffect(() => {
    fetch('/api/user/history')
      .then(res => res.json())
      .then(data => {
        setLiked(data.liked || []);
        setCommented(data.commented || []);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-2xl font-bold text-gray-800">📜 My Interaction History</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">❤️ Liked Videos</h2>
        {liked.length === 0 ? (
          <p className="text-sm text-gray-500">No liked videos yet.</p>
        ) : (
          <div className="grid gap-4">
            {liked.map((video) => (
              <VideoCard key={video._id} video={video} currentUser={me} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-8 mb-2">💬 Commented Videos</h2>
        {commented.length === 0 ? (
          <p className="text-sm text-gray-500">No comments made yet.</p>
        ) : (
          <div className="grid gap-4">
            {commented.map((video) => (
              <VideoCard key={video._id} video={video} currentUser={me} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
