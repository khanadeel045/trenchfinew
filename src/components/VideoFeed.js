// src/components/VideoFeed.js
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import CommentSection from '@/components/CommentSection';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);
  const [followingSet, setFollowingSet] = useState(new Set());

  useEffect(() => {
    async function load() {
      // Load current user
      try {
        const uRes = await fetch('/api/me');
        if (uRes.ok) {
          const u = await uRes.json();
          setMe(u);
          setFollowingSet(new Set(u.following.map(f => String(f._id))));
        }
      } catch { }
      // Load videos
      const vRes = await fetch('/api/videos/feed');
      if (vRes.ok) setVideos(await vRes.json());
    }
    load();
  }, []);

  const myId = me ? String(me._id || me.id) : null;

  const toggleFollow = async (userIdRaw) => {
    if (!myId) return toast.error('Login karo pehle!');
    const userId = String(userIdRaw);
    const isFollowing = followingSet.has(userId);
    const method = isFollowing ? 'DELETE' : 'POST';
    const url = `/api/users/${userId}/${isFollowing ? 'unfollow' : 'follow'}`;
    const res = await fetch(url, { method });
    if (!res.ok) return toast.error('Kuch ghalat ho gaya');
    setFollowingSet(prev => {
      const nxt = new Set(prev);
      isFollowing ? nxt.delete(userId) : nxt.add(userId);
      return nxt;
    });
    toast.success(isFollowing ? 'Unfollowed' : 'Followed');
  };

  const toggleLike = async (videoId) => {
    if (!myId) return toast.error('Login karo pehle!');
    const res = await fetch(`/api/videos/${videoId}/like`, { method: 'POST' });
    if (!res.ok) return toast.error('Kuch ghalat ho gaya');
    const { liked, likeCount } = await res.json();
    setVideos(videos.map(v =>
      v._id === videoId ? { ...v, likedByMe: liked, likeCount } : v
    ));
  };

  const handleShare = (videoId) => {
    const url = `${window.location.origin}/videofeed/${videoId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      {videos.map(video => {
        const author = video.userId;
        if (!author) {
          // agar user delete ya null ho gaya, skip
          return null;
        }
        const authorId = String(author._id);
        const isFollowing = followingSet.has(authorId);

        return (
          <div key={video._id} className="rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={author.profileImage || '/default-avatar.jpg'}
                  alt={author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">{author.username}</span>
              </div>
              {authorId !== myId && (
                <button
                  onClick={() => toggleFollow(authorId)}
                  className={`px-3 py-1 rounded ${isFollowing
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                  {isFollowing ? 'Followed' : 'Follow'}
                </button>
              )}
            </div>

            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-400">{video.description}</p>
            </div>

            <video
              src={video.videoUrl}
              controls
              className="w-full bg-black h-[350px]"
            />

            <div className="flex items-center gap-6 p-4 border-t border-gray-700 text-gray-400">
              <button
                onClick={() => toggleLike(video._id)}
                disabled={!myId}
                className={` cursor-pointer flex items-center gap-1 transition ${video.likedByMe ? 'text-pink-400' : ''
                  } ${!myId ? 'opacity-40 cursor-not-allowed' : 'hover:text-pink-400'}`}
              >
                {video.likedByMe ? '👎' : '🔥'} <span>{video.likeCount || 0}</span>
              </button>


              <CommentSection
                videoId={video._id}
                me={me}
                initialCount={video.commentCount || 0}
              />

              <button
                onClick={() => handleShare(video._id)}
                className="cursor-pointer flex items-center gap-1 hover:text-indigo-400"
              >
                ↗️ <span>Share</span>
              </button>
            </div>
          </div>
        );
      })}

      {videos.filter(v => v.userId).length === 0 && (
        <p className="text-center text-gray-400">No video Found.</p>
      )}
    </div>
  );
}
