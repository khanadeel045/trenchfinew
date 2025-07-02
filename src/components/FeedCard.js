// components/FeedCard.js
'use client';

import Image from 'next/image';
import {
  ThumbsUp,
  MessageCircle,
  Repeat,
  Send,
  MoreHorizontal,
  Leaf,
} from 'lucide-react';

export default function FeedCard({
  video,
  onLike,
  onCommentClick,
  onShare,
  me,
}) {
  const myId = me?._id || me?.id;
  const liked = video.likedByMe;

  return (
    <div className="bg-[#0f1119] rounded-2xl shadow-lg p-6 text-gray-100 max-w-3xl mx-auto">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={video.userId?.avatar || '/avatar.png'}
            alt={video.userId?.username}
            width={42}
            height={42}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{video.userId?.username}</p>
            <p className="text-xs text-gray-400">
              {timeAgo(video.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500">
            Follow
          </button>
          <MoreHorizontal size={18} />
        </div>
      </div>

      {/* ── Body text ──────────────────────────────────────── */}
      {video.description && (
        <p className="mt-4 text-sm leading-relaxed text-gray-200">
          {video.description}
        </p>
      )}

      {/* ── Video / image area ────────────────────────────── */}
      <div className="mt-4 border-2 border-[#007bff] rounded-lg overflow-hidden">
        <video
          src={video.videoUrl}
          controls
          className="w-full h-auto bg-black"
        />
      </div>

      {/* ── Stat row ──────────────────────────────────────── */}
      <div className="flex justify-between items-center text-xs mt-3 text-gray-400">
        <div className="flex items-center gap-1">
          <ThumbsUp size={12} className="text-amber-400" />
          <Leaf size={12} className="text-green-400 -ml-1" />
          <span className="ml-1">{video.likeCount.toLocaleString()}</span>
        </div>
        <div>
          {video.commentCount.toLocaleString()} comments&nbsp;&nbsp;·&nbsp;&nbsp;
          {video.repostCount?.toLocaleString() || '0'} reposts
        </div>
      </div>

      {/* ── Action bar ─────────────────────────────────────── */}
      <div className="mt-3 pt-3 border-t border-[#1c1e29] grid grid-cols-4 text-sm">
        {/* Like */}
        <button
          onClick={() => onLike(video._id)}
          disabled={!myId}
          className={`flex items-center justify-center gap-1 py-2 rounded hover:bg-[#1a1d27] ${
            liked ? 'text-pink-400' : 'text-gray-300'
          } ${!myId && 'opacity-40 cursor-not-allowed'}`}
        >
          <ThumbsUp size={18} />
          Like
        </button>

        {/* Comments */}
        <button
          onClick={() => onCommentClick(video)}
          className="flex items-center justify-center gap-1 py-2 rounded hover:bg-[#1a1d27]"
        >
          <MessageCircle size={18} />
          Comments
        </button>

        {/* Repost */}
        <button
          className="flex items-center justify-center gap-1 py-2 rounded hover:bg-[#1a1d27]"
          onClick={() => alert('Repost coming soon')}
        >
          <Repeat size={18} />
          Repost
        </button>

        {/* Share */}
        <button
          onClick={() => onShare(video._id)}
          className="flex items-center justify-center gap-1 py-2 rounded hover:bg-[#1a1d27]"
        >
          <Send size={18} />
          Send
        </button>
      </div>
    </div>
  );
}

/* ── utils ─*/
function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000); // mins
  if (diff < 1) return 'just now';
  if (diff < 60) return `${diff} min ago`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
