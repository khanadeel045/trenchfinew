'use client';
import { useEffect, useState } from 'react';

export default function MyVideosPage() {
    const [uploading, setUploading] = useState(false); // ✅ yeh line add karo

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
  const [selectedFileName, setSelectedFileName] = useState(''); // ✅ yeh yahin add karo

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
    setUploading(true); // Disable the button + show text

    setMessage('');
    setGlobalMessage('');

    if (!uploadForm.file) {
      setMessage('❌ Please select a video file');
      setUploading(false); // Reset on validation fail
      return;
    }

    const data = new FormData();
    data.append('title', uploadForm.title);
    data.append('description', uploadForm.description);
    data.append('file', uploadForm.file);
    data.append('isPrivate', uploadForm.isPrivate);

    try {
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
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong');
    } finally {
      setUploading(false); // ✅ Always reset the uploading state
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">My Uploaded Videos</h2>
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

      {videos.length === 0 && <p className="text-white">No videos uploaded yet.</p>}

      <div className='flex gap-10 flex-wrap'>
        {videos.map(video => (
          <div key={video._id} className="w-80 bg-gray-900 rounded-lg overflow-hidden shadow">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <p className="text-sm text-white">⏱️ {new Date(video.createdAt).toLocaleString()}</p>
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
              <p className="text-white text-sm">{video.description}</p>
            </div>
          </div>
        ))}

      </div>
      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative transition-all duration-300">
            <button
              className="absolute top-2 right-3 text-black text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4  text-black">Upload New Video</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                className="w-full border px-3 py-2 rounded  text-black"
                required
              />
              <textarea
                placeholder="Description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                className="w-full border px-3 py-2 rounded  text-black"
              />

<label className="inline-block border border-gray-400 px-4 py-2 rounded cursor-pointer bg-white text-black font-semibold hover:bg-gray-100 transition">
  Choose Video
  <input
    type="file"
    accept="video/*"
    onChange={(e) => {
      const file = e.target.files[0];
      setUploadForm({ ...uploadForm, file });
      setSelectedFileName(file?.name || '');
    }}
    className="hidden"
    required
  />
</label>

{selectedFileName && (
  <p className="mt-2 text-sm text-gray-700">🎬 Selected: <span className="font-medium">{selectedFileName}</span></p>
)}


              {/* <label className="flex gap-2 items-center">
<input
type="checkbox"
checked={uploadForm.isPrivate}
onChange={(e) => setUploadForm({ ...uploadForm, isPrivate: e.target.checked })}
/>
Private Video
</label> */}
              <button
                type="submit"
                disabled={uploading}
                className={`w-full px-4 py-2 rounded font-semibold transition ${uploading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
              >
                {uploading ? '⏳ Uploading...' : 'Upload'}
              </button>

            </form>
            {message && (
              <div className="mt-4 text-sm text-center transition-opacity duration-500 text-black">
                {message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
