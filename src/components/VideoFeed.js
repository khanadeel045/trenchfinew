'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import CommentSection from '@/components/CommentSection';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);
  const router = useRouter();

  /* ─────────────── Load user + videos ─────────────── */
  useEffect(() => {
    async function load() {
      // 1) Current user (if logged-in)
      try {
        const u = await fetch('/api/me');
        if (u.ok) setMe(await u.json());
      } catch (e) {
        /* ignore */
      }

      // 2) Video list
      const res = await fetch('/api/videos/feed');
      const data = await res.json();
      setVideos(data);
    }
    load();
  }, []);

  const myId = me?._id || me?.id;           // helper

  /* ─────────────── Like toggle ─────────────── */
  const toggleLike = async (videoId) => {
    if (!myId) return toast.error('Login karo pehle!');
    const res = await fetch(`/api/videos/${videoId}/like`, { method: 'POST' });
    if (!res.ok) return toast.error('Kuch ghalat ho gaya');

    const { liked, likeCount } = await res.json();
    setVideos(videos.map(v =>
      v._id === videoId ? { ...v, likedByMe: liked, likeCount } : v
    ));
  };

  /* ─────────────── Share link copy ─────────────── */
  const handleShare = (videoId) => {
    const url = `${window.location.origin}/videofeed/${videoId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  /* ─────────────── Render ─────────────── */
  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {videos.map(video => (
        <div key={video._id} className="w-[400px] bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Video player */}
          <video
            src={video.videoUrl}
            controls
            className="w-[400px] h-auto bg-black"
          />

          {/* Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">
              {video.title}
            </h3>
            <p className="text-sm text-gray-400">
              {video.description}
            </p>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-6 p-4 border-t border-gray-700 text-gray-400">
            {/* Like */}
            <button
              onClick={() => toggleLike(video._id)}
              disabled={!myId}
              className={`flex items-center gap-1 transition ${
                video.likedByMe ? 'text-pink-400' : ''
              } ${!myId ? 'opacity-40 cursor-not-allowed' : 'hover:text-pink-400'}`}
            >
              👍 <span>{video.likeCount}</span>
            </button>

            {/* Comments */}
            <CommentSection
              videoId={video._id}
              me={me}
              initialCount={video.commentCount}
            />

            {/* Share */}
            <button
              onClick={() => handleShare(video._id)}
              className="flex items-center gap-1 hover:text-indigo-400"
            >
              ↗️ <span>Share</span>
            </button>
          </div>
        </div>
      ))}

      {/* Agar koi video hi nahin */}
      {videos.length === 0 && (
        <p className="text-center text-gray-400">No video Found.</p>
      )}
    </div>
  );
}
