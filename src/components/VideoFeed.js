'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import CommentSection from '@/components/CommentSection';
import { HomeIcon, CurrencyDollarIcon, TvIcon, UserIcon, FlagIcon } from '@heroicons/react/24/outline';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);
  const [followingSet, setFollowingSet] = useState(new Set());
  const [muted, setMuted] = useState(true);
  const [tab, setTab] = useState('my'); // 'following' | 'my'
  const [isLoading, setIsLoading] = useState(false); // ✅ NEW
  const videoRefs = useRef([]);
  const scrollRef = useRef(null); // ✅ NEW

  const loadData = async (type = 'following') => {
    setIsLoading(true);       // 🔄 start loading
    setVideos([]);            // 🧹 clear old content

    const userRes = await fetch('/api/me');
    const user = userRes.ok ? await userRes.json() : null;
    setMe(user);
    setFollowingSet(new Set(user?.following?.map(f => String(f._id)) || []));

    const res = await fetch(`/api/videos/feed?type=${type}`);
    if (res.ok) setVideos(await res.json());

    setIsLoading(false);      // ✅ done loading
  };

  useEffect(() => {
    loadData(tab);
  }, [tab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach(v => v && observer.observe(v));
    return () => videoRefs.current.forEach(v => v && observer.unobserve(v));
  }, [videos]);

  const toggleMuted = () => {
    setMuted(prev => !prev);
    toast(muted ? '🔊 Sound On' : '🔇 Sound Off');
    videoRefs.current.forEach(video => {
      if (video) video.muted = !muted;
    });
  };

  const toggleFollow = async (userIdRaw) => {
    if (!me) return toast.error('Login karo pehle!');
    const userId = String(userIdRaw);
    const isFollowing = followingSet.has(userId);
    const method = isFollowing ? 'DELETE' : 'POST';
    const url = `/api/users/${userId}/${isFollowing ? 'unfollow' : 'follow'}`;
    const res = await fetch(url, { method });
    if (!res.ok) return toast.error('Kuch ghalat ho gaya');

    setFollowingSet(prev => {
      const next = new Set(prev);
      isFollowing ? next.delete(userId) : next.add(userId);
      return next;
    });

    toast.success(isFollowing ? 'Unfollowed' : 'Followed');
  };

  const toggleLike = async (videoId) => {
    if (!me) return toast.error('Login karo pehle!');
    const res = await fetch(`/api/videos/${videoId}/like`, { method: 'POST' });
    if (!res.ok) return toast.error('Kuch ghalat ho gaya');
    const { liked, likeCount } = await res.json();
    setVideos(videos.map(v => v._id === videoId ? { ...v, likedByMe: liked, likeCount } : v));
  };

  const handleShare = (videoId) => {
    const url = `${window.location.origin}/videofeed/${videoId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="h-[91vh] overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}

      >
        {/* 🔼 Tabs */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center gap-4 bg-[#000000cc] px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">

          {/* 🏠 Home Icon */}
          <button
            onClick={() => window.location.href = '/'}
            title="Home"
            className="text-white hover:text-gray-300"
          >
            <HomeIcon className="h-6 w-6" />
          </button>

          {/* Trending */}
          <button
            onClick={() => {
              setTab('my');
              scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
              loadData('my');
            }}
            className={`px-4 py-1 rounded-full ${tab === 'my' ? 'bg-white text-black font-bold' : 'text-gray-400'}`}
          >
            Trending
          </button>

          {/* Following */}
          <button
            onClick={() => {
              setTab('following');
              scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });
              loadData('following');
            }}
            className={`px-4 py-1 rounded-full ${tab === 'following' ? 'bg-white text-black font-bold' : 'text-gray-400'}`}
          >
            Following
          </button>
        </div>

        {/* 🔄 Loader */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-screen text-white">
            <svg className="animate-spin h-10 w-10 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        )}
        <div className="h-full">
          {!isLoading && videos.map((video, index) => {
            const author = video.userId;
            if (!author) return null;

            const isFollowing = followingSet.has(String(author._id));

            return (
              <div key={video._id} className="h-full snap-start relative flex items-center justify-center">
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={video.videoUrl}
                  muted={muted}
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                />

                {/* Sound Button */}
                <button
                  onClick={toggleMuted}
                  className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 px-3 py-2 rounded-full text-white text-sm z-99"
                >
                  {muted ? '🔇' : '🔊'}
                </button>

                {/* Info Overlay */}
                <div className="absolute bottom-0 w-full px-4 pb-6 text-left bg-gradient-to-t from-black via-black/50 to-transparent z-10">
                  <p className="text-sm font-medium text-gray-200">{author.username}</p>
                  <h3 className="text-xl font-bold">{video.title}</h3>
                  <p className="text-sm text-gray-300">{video.description}</p>

                  {/* Right-side Buttons */}
                  <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-5 text-white text-xl">
                    {String(author._id) !== String(me?._id) && (
                      <button
                        onClick={() => toggleFollow(author._id)}
                        className="text-sm px-3 py-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        {isFollowing ? 'Followed' : 'Follow'}
                      </button>
                    )}

                    <button
                      onClick={() => toggleLike(video._id)}
                      disabled={!me}
                      className={`flex flex-col items-center ${video.likedByMe ? 'text-pink-400' : 'hover:text-pink-400'} ${!me ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {video.likedByMe ? '👎' : '🔥'}
                      <span className="text-sm">{video.likeCount || 0}</span>
                    </button>

                    <div className="text-center">
                      <CommentSection
                        videoId={video._id}
                        me={me}
                        initialCount={video.commentCount || 0}
                      />
                    </div>

                    <button
                      onClick={() => handleShare(video._id)}
                      className="hover:text-indigo-400 text-center"
                    >
                      ↗️
                      <div className="text-sm">Share</div>
                    </button>
                  </div>
                </div>


              </div>
            );
          })}


        </div>


        {!isLoading && videos.length === 0 && tab && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <svg className="h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM9 14.25c.75.75 2.25.75 3 0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No videos found in <strong>{tab === 'my' ? 'Your Videos' : 'Following'}</strong> tab.</p>
          </div>
        )}

      </div>

      <div className="w-full bottom-0 z-50 flex justify-around items-center bg-black/80 backdrop-blur-md py-3 border-t border-white/10 text-white text-xs">
        <button className="flex flex-col items-center gap-1 cursor-pointer">
          <a href="/">
            <HomeIcon className="h-6 w-6" />
            <span>Home</span>
          </a>
        </button>
        <button className="flex flex-col items-center gap-1 cursor-pointer">
          <a href="/comingsoon">

            <CurrencyDollarIcon className="h-6 w-6" />
            <span>Trade</span>
          </a>

        </button>
        {/* <button className="flex flex-col items-center gap-1">
          <TvIcon className="h-6 w-6" />
          <span>Live</span>
        </button> */}
        <button className="flex flex-col items-center gap-1 cursor-pointer">
          <a href="/account">

            <UserIcon className="h-6 w-6" />
            <span>Profile</span>
          </a>

        </button>
      </div>
    </div>

  );
}
