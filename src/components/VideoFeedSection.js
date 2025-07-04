'use client';

import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

const mockVideos = [
  {
    id: '1',
    user: { name: 'Trader-Marcus', avatar: '/avatars/marcus.jpg' },
    timestamp: '14 min ago',
    thumbnail: '/thumbnails/video1.jpg',
    tokenTag: '#Dodge',
    caption: 'Long on PEPE 3×',
  },
  {
    id: '2',
    user: { name: 'Trader-Lila', avatar: '/avatars/lila.jpg' },
    timestamp: '22 min ago',
    thumbnail: '/thumbnails/video2.jpg',
    tokenTag: '#Solana',
    caption: 'Bullish on SOL',
  },
  {
    id: '3',
    user: { name: 'Trader-Jay', avatar: '/avatars/jay.jpg' },
    timestamp: '30 min ago',
    thumbnail: '/thumbnails/video3.jpg',
    tokenTag: '#ETH',
    caption: 'Short ETH dip',
  },
];

export default function VideoFeedSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold">Explore Trader Videos</h2>
          <p className="text-gray-600">
            Watch short-form content from top traders. React, comment, and stay updated.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video) => (
            <div key={video.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Image
                    src={video.user.avatar}
                    alt={video.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{video.user.name}</p>
                    <p className="text-gray-500">{video.timestamp}</p>
                  </div>
                </div>
                <MoreVertical size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>

              {/* Thumbnail */}
              <div className="relative">
                <Image
                  src={video.thumbnail}
                  alt={video.caption}
                  width={480}
                  height={270}
                  className="w-full h-auto object-cover"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {video.tokenTag}
                </span>
                <span className="absolute bottom-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                  {video.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
