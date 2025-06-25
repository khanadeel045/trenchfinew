'use client';
import { useEffect, useState } from 'react';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch('/api/videos/feed')
      .then(res => res.json())
      .then(setVideos);

    fetch('/api/me')
      .then(res => res.json())
      .then(setMe);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return;
    const res = await fetch(`/api/videos/${id}/delete`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setVideos(videos.filter(v => v._id !== id));
    }
  };

  return (
    <div className="space-y-6 p-4 pt-30">
      {videos.map(video => (
        <div key={video._id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                👤 <span className="font-mono">{video.userId?.name || 'Unknown User'}</span>
              </p>
              <p className="text-xs text-gray-500">
                ⏱️ {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>

          </div>

          <video
            controls
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            onContextMenu={(e) => e.preventDefault()}
            src={video.videoUrl}
            className="w-full"
            style={{ maxHeight: '500px' }}
          />

          <div className="p-4">
            <h2 className="text-white text-xl font-semibold">{video.title}</h2>
            <p className="text-gray-400 mt-1">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
