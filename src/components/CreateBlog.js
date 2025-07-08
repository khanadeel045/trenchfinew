// src/components/CreateBlogProfessional.js
'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default), { ssr: false });

function autoSlug(text) {
  return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-');
}

export default function CreateBlogProfessional({
  initialData = null,
  onSubmit    = null,
  onSuccess   = null
}) {
  const [title, setTitle]               = useState(initialData?.title || '');
  const [slug, setSlug]                 = useState(initialData?.slug || '');
  const [manualSlug, setManualSlug]     = useState(!!initialData?.slug);
  const [content, setContent]           = useState(initialData?.content || '');
  const [featureImage, setFeatureImage] = useState(null);
  const [featurePreview, setFeaturePreview] = useState(initialData?.featureImageUrl || '');
  const [categories, setCategories]     = useState([]);
  const [categoryId, setCategoryId]     = useState(initialData?.category || '');
  const [submitting, setSubmitting]     = useState(false);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/categories').then(r=>r.json()).then(setCategories).catch(console.error);
  }, []);

  // Auto-generate slug when title changes, if user has not manually edited slug
  useEffect(() => {
    if (!manualSlug) {
      setSlug(autoSlug(title));
    }
  }, [title, manualSlug]);

  const handleSlugChange = e => {
    setSlug(e.target.value);
    setManualSlug(true);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFeatureImage(file);
      setFeaturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId || !slug.trim()) {
      alert('Title, Slug, Content aur Category required hain.');
      return;
    }
    setSubmitting(true);

    const form = new FormData();
    form.append('title', title);
    form.append('slug', slug);
    form.append('content', content);
    form.append('category', categoryId);
    if (featureImage) form.append('featureImage', featureImage);

    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        const res = await fetch('/api/blogs', { method: 'POST', body: form });
        if (!res.ok) throw new Error('Server error');
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Submit mein masla hua.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return <p>Loading editor...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Permalink (Slug) */}
      <div>
        <label className="block mb-1 font-medium">Permalink (Slug)</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={slug}
          onChange={handleSlugChange}
        />
        <p className="text-sm text-gray-500 mt-1">
          SEO-friendly URL segment. Aap manually edit kar sakte hain.
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full border p-2 rounded"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Feature Image */}
      <div>
        <label className="block mb-1 font-medium">Feature Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {featurePreview && <img src={featurePreview} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" />}
      </div>

      {/* Content */}
      <div>
        <label className="block mb-1 font-medium">Content</label>
        <MDEditor value={content} onChange={setContent} height={300} visibleDragbar />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-2 rounded text-white ${
          submitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {submitting ? 'Please wait...' : (initialData ? 'Save Changes' : 'Publish Blog')}
      </button>
    </form>
  );
}
