// src/components/BlogsTab.js
'use client';
import { useState, useEffect } from 'react';
import CreateBlogProfessional from './CreateBlog';
import { X } from 'lucide-react';

export default function BlogsTab() {
  const [blogs, setBlogs]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [modalMode, setModalMode]     = useState('create'); // 'create' | 'edit'
  const [currentBlog, setCurrentBlog] = useState(null);
  const [userId, setUserId]           = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const meRes  = await fetch('/api/me');
        const meData = await meRes.json();
        setUserId(meData._id);

        const res   = await fetch('/api/blogs', { cache: 'no-store' });
        const data  = await res.json();
        if (res.ok) {
          setBlogs(data.filter(b => b.author._id === meData._id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (blogs.length) {
      blogs.forEach(b =>
        console.log('FeatureImage path for blog', b._id, ':', b.featureImage)
      );
    }
  }, [blogs]);

  const refreshBlogs = async () => {
    const res  = await fetch('/api/blogs', { cache: 'no-store' });
    const data = await res.json();
    setBlogs(data.filter(b => b.author._id === userId));
  };

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs(prev => prev.filter(b => b._id !== id));
    } else {
      const err = await res.json();
      alert('Error: ' + err.error);
    }
  };

  const openCreate = () => {
    setModalMode('create');
    setCurrentBlog(null);
    setShowModal(true);
  };

  const openEdit = blog => {
    setModalMode('edit');
    setCurrentBlog(blog);
    setShowModal(true);
  };

  const handleSubmit = async formData => {
    let url = '/api/blogs';
    let method = 'POST';
    if (modalMode === 'edit') {
      url = `/api/blogs/${currentBlog._id}`;
      method = 'PUT';
    }
    const res = await fetch(url, { method, body: formData });
    if (res.ok) {
      setShowModal(false);
      await refreshBlogs();
    } else {
      const err = await res.json();
      alert('Error: ' + err.error);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow p-8 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Blogs</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          + Add New Blog
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading your blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">You haven't written any blogs yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map(b => (
            <div
              key={b._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Feature Image */}
              {b.featureImage ? (
                <img
                  src={b.featureImage.startsWith('/') ? b.featureImage : `/${b.featureImage}`}
                  alt={b.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

<div className="p-4 flex flex-col justify-between h-56">
  <div>
    <h3 className="text-lg font-medium text-gray-800">{b.title}</h3>
    <p className="mt-1 text-sm text-gray-500">
      Category: <span className="font-medium">{b.category?.name || 'N/A'}</span>
    </p>
    {/* Truncated content snippet */}
    <p className="mt-2 text-gray-700">
      {b.content.length > 150
        ? b.content.substring(0, 150) + '...'
        : b.content
      }
    </p>
  </div>
  <div className="mt-4 flex gap-2">
    <button
      onClick={() => openEdit(b)}
      className="flex-1 text-center py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(b._id)}
      className="flex-1 text-center py-2 bg-red-500 hover:bg-red-600 text-white rounded"
    >
      Delete
    </button>
  </div>
</div>

            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 p-4 overflow-auto">
          <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-xl mt-20">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {modalMode === 'create' ? 'Create New Blog' : 'Edit Blog'}
              </h2>
              <CreateBlogProfessional
                initialData={
                  modalMode === 'edit' && currentBlog
                    ? {
                        title:           currentBlog.title,
                        slug:           currentBlog.slug,
                        content:         currentBlog.content,
                        category:        currentBlog.category?._id,
                        featureImageUrl: currentBlog.featureImage
                      }
                    : null
                }
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
