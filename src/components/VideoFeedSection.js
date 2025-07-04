'use client';

import { useEffect, useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function VideoFeedSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch most liked videos from API
  useEffect(() => {
    async function fetchMostLikedVideos() {
      try {
        const response = await fetch('/api/videos/feed');
        const allVideos = await response.json();
        
        // Sort by most likes first (highest to lowest)
        const sortedByLikes = allVideos.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        const topLikedVideos = sortedByLikes.slice(0, 3);
        
        console.log('🔥 Most liked videos:', topLikedVideos.map(v => ({
          title: v.title,
          likes: v.likeCount || 0,
          username: v.userId?.username
        })));
        
        setVideos(topLikedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMostLikedVideos();
  }, []);

  // Helper function to format time ago
  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000); // minutes
    if (diff < 1) return 'just now';
    if (diff < 60) return `${diff} min ago`;
    const h = Math.floor(diff / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  };

  // Extract token from title (first word)
  const getTokenTag = (title) => {
    const firstWord = title?.split(' ')[0] || 'Token';
    return `#${firstWord}`;
  };

  // Default thumbnail for videos (trading setup image)
  const getVideoThumbnail = (video) => {
    // If video has a thumbnail, use it, otherwise use a default trading image
    return video.thumbnailUrl || '/thumbnails/default-trading.jpg';
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold">Explore Trader Videos</h2>
          <p className="text-gray-600">
            Watch the most popular content from top traders. React, comment, and stay updated.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Search token by name, address..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Trending
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
            New
          </button>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loading skeletons */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-64 bg-gray-300"></div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos uploaded yet.</p>
            <p className="text-gray-400">Be the first to share your trading insights!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={video._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
                
                {/* Card Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <div className="flex items-center space-x-3">
                    {/* User Avatar */}
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                      <img 
                        src="/avatars/default-avatar.png" 
                        alt={video.userId?.username || 'User'} 
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-8 h-8 bg-gray-400 rounded-full items-center justify-center text-white text-sm font-semibold" style={{display: 'none'}}>
                        {video.userId?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {video.userId?.username || 'Trader-Marcus'}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {timeAgo(video.createdAt)}
                      </p>
                    </div>
                  </div>
                  {/* Three Dots Menu */}
                  <MoreVertical size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>

                {/* Custom Video Player */}
                <div className="relative">
                  <video
                    ref={(el) => {
                      if (el) {
                        el.videoId = video._id;
                      }
                    }}
                    className="w-full h-64 object-cover bg-black cursor-pointer"
                    preload="metadata"
                    poster={video.thumbnailUrl}
                    onClick={(e) => {
                      // Toggle play/pause when clicking on video
                      if (e.target.paused) {
                        e.target.play();
                      } else {
                        e.target.pause();
                      }
                    }}
                    onPlay={(e) => {
                      // Hide play button when video starts
                      const playBtn = e.target.parentElement.querySelector('.play-button');
                      if (playBtn) playBtn.style.display = 'none';
                    }}
                    onPause={(e) => {
                      // Show play button when video pauses
                      const playBtn = e.target.parentElement.querySelector('.play-button');
                      if (playBtn) playBtn.style.display = 'flex';
                    }}
                    onEnded={(e) => {
                      // Show play button when video ends
                      const playBtn = e.target.parentElement.querySelector('.play-button');
                      if (playBtn) playBtn.style.display = 'flex';
                    }}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Custom Play Button - Only shows when paused */}
                  <div 
                    className="play-button absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity hover:bg-opacity-50"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent double-triggering
                      const video = e.target.closest('.relative').querySelector('video');
                      if (video.paused) {
                        video.play();
                      }
                    }}
                  >
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="text-gray-800"
                      >
                        <path 
                          d="M8 5v14l11-7z" 
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Token Tag - Top Left */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {getTokenTag(video.title)}
                    </span>
                  </div>
                  
                  {/* Video Caption - Bottom */}
                  <div className="absolute bottom-3 left-3 right-12 z-10 pointer-events-none">
                    <div className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full inline-block max-w-full">
                      <span className="truncate block">
                        {video.description || video.title || 'Trading Strategy'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Like Count Badge - Bottom Right */}
                  {video.likeCount > 0 && (
                    <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        ❤️ {video.likeCount}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* If no real videos, show mock data like in the image */}
        {!loading && videos.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { user: 'Trader-Marcus', time: '14 min ago', token: '#Dodge', caption: 'Long on PEPE 3x' },
              { user: 'Trader-Marcus', time: '1 min ago', token: '#Dodge', caption: 'Long on PEPE 3x' },
              { user: 'Trader-Marcus', time: '1 min ago', token: '#Dodge', caption: 'Long on PEPE 3x' }
            ].map((mock, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Card Header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      T
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{mock.user}</p>
                      <p className="text-gray-500 text-xs">{mock.time}</p>
                    </div>
                  </div>
                  <MoreVertical size={20} className="text-gray-500" />
                </div>

                {/* Mock Trading Image */}
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-2">📈</div>
                      <div className="text-sm">Trading Setup</div>
                    </div>
                  </div>
                  
                  {/* Token Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {mock.token}
                    </span>
                  </div>
                  
                  {/* Caption */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full">
                      {mock.caption}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
