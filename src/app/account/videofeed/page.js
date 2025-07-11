'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(setMe);
  }, []);

  useEffect(() => {
    if (me?._id) {
      fetch('/api/videos/feed')
        .then(res => res.json())
        .then(data => {
          const myVideos = data.filter(v => v.userId === me._id);
          setVideos(myVideos);
        });
    }
  }, [me]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return;
    const res = await fetch(`/api/videos/${id}/delete`, { method: 'DELETE' });
    if (res.ok) {
      setVideos(videos.filter(v => v._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">My Uploaded Videos</h1>
        <button
          onClick={() => router.push('/account/videofeed/upload')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ⬆️ Upload New Video
        </button>
      </div>

      {videos.length === 0 && (
        <p className="text-gray-400">No videos uploaded yet.</p>
      )}

      {videos.map(video => (
        <div key={video._id} className="w-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                ⏱️ {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/videofeed/edit/${video._id}`)}
                className="text-yellow-400 hover:underline text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(video._id)}
                className="text-red-500 hover:underline text-sm"
              >
                🗑 Delete
              </button>
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
