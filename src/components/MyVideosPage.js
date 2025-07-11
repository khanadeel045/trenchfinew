'use client';
import { useEffect, useState } from 'react';

export default function MyVideosPage() {
  const [videos, setVideos] = useState([]);
  const [me, setMe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    file: null,
    isPrivate: false,
  });
  const [message, setMessage] = useState('');
  const [globalMessage, setGlobalMessage] = useState('');

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        console.log('👤 me from /api/me:', data);
        setMe(data);
      });
  }, []);

  const loadMyVideos = async () => {
    const res = await fetch('/api/videos/feed');
    const all = await res.json();

    console.log('✅ Total videos from feed:', all);

    if (!me?._id) {
      console.log('❌ me._id is missing');
      return;
    }

    const myVideos = all.filter(v => {
      console.log('🔍 comparing', v.userId?._id?.toString(), '===', me._id?.toString());
      return v.userId?._id?.toString() === me._id?.toString();
    });


    console.log('✅ Filtered my videos:', myVideos);
    setVideos(myVideos);
  };

  useEffect(() => {
    if (me?._id) loadMyVideos();
  }, [me]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return;
    const res = await fetch(`/api/videos/${id}/delete`, { method: 'DELETE' });
    if (res.ok) {
      setVideos(videos.filter(v => v._id !== id));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    setGlobalMessage('');

    if (!uploadForm.file) return setMessage('❌ Please select a video file');

    const data = new FormData();
    data.append('title', uploadForm.title);
    data.append('description', uploadForm.description);
    data.append('file', uploadForm.file);
    data.append('isPrivate', uploadForm.isPrivate);

    const res = await fetch('/api/videos/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();

    if (res.ok) {
      setMessage('✅ Video uploaded successfully!');
      setUploadForm({ title: '', description: '', file: null, isPrivate: false });
      loadMyVideos();

      setTimeout(() => {
        setShowModal(false);
        setMessage('');
        setGlobalMessage('✅ Video uploaded successfully!');
      }, 500);
    } else {
      setMessage('❌ Upload failed: ' + (result.error || 'Server error'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">My Uploaded Videos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Upload Video
        </button>
      </div>

      {globalMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 transition-all duration-500">
          {globalMessage}
        </div>
      )}

      {videos.length === 0 && <p className="text-gray-500">No videos uploaded yet.</p>}

      <div className='flex gap-10 flex-wrap'>  
        {videos.map(video => (
          <div key={video._id} className="w-80 bg-gray-900 rounded-lg overflow-hidden shadow">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <p className="text-sm text-gray-400">⏱️ {new Date(video.createdAt).toLocaleString()}</p>
              <button
                onClick={() => handleDelete(video._id)}
                className="text-red-500 text-sm hover:underline"
              >
                🗑 Delete
              </button>
            </div>
            <video
              controls
              src={video.videoUrl}
              className="w-full"
              preload="metadata"
              playsInline
              controlsList="nodownload noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="p-4">
              <h3 className="text-white text-lg font-semibold">{video.title}</h3>
              <p className="text-gray-400 text-sm">{video.description}</p>
            </div>
          </div>
        ))}

      </div>
      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative transition-all duration-300">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                className="w-full"
                required
              />
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={uploadForm.isPrivate}
                  onChange={(e) => setUploadForm({ ...uploadForm, isPrivate: e.target.checked })}
                />
                Private Video
              </label>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded w-full"
              >
                Upload
              </button>
            </form>
            {message && (
              <div className="mt-4 text-sm text-center text-gray-700 transition-opacity duration-500">
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
