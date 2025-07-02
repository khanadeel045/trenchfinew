// components/VideoCard.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ThumbsUp, MessageCircle, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function VideoCard({ video, currentUser }) {
  const router = useRouter();
  const myId = currentUser?._id || currentUser?.id;

  const [liked, setLiked] = useState(video.likedByMe || false);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);

  const toggleLike = async (e) => {
    e.preventDefault();
    if (!myId) return toast.error('Login karo pehle!');
    try {
      const res = await fetch(`/api/videos/${video._id}/like`, { method: 'POST' });
      if (!res.ok) throw new Error();
      const { liked: newLiked, likeCount: newCount } = await res.json();
      setLiked(newLiked);
      setLikeCount(newCount);
    } catch {
      toast.error('Like failed');
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/videofeed/${video._id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      <Link href={`/videofeed/${video._id}`}>
        <a className="block relative pb-[56.25%] bg-gray-200">
          <Image
            src={video.thumbnailUrl || video.videoUrl}
            alt={video.title}
            fill
            className="object-cover"
          />
        </a>
      </Link>

      <div className="p-4">
        <h3
          onClick={() => router.push(`/videofeed/${video._id}`)}
          className="text-lg font-semibold text-gray-800 hover:underline cursor-pointer"
        >
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {video.description}
          </p>
        )}

        <div className="mt-4 flex items-center text-gray-500 text-sm">
          <button
            onClick={toggleLike}
            disabled={!myId}
            className={`flex items-center gap-1 transition ${
n            liked ? 'text-blue-500' : 'hover:text-blue-500'
n          } ${!myId && 'opacity-40 cursor-not-allowed'}`}
          >
            <ThumbsUp size={18} />
            <span>{likeCount}</span>
          </button>

          <div className="flex items-center gap-1 ml-6">
            <MessageCircle size={18} />
            <span>{video.commentCount || 0}</span>
          </div>

          <button onClick={handleShare} className="ml-auto flex items-center gap-1 hover:text-indigo-500">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
