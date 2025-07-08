'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCategoryPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert('Name aur Slug donon likhen');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug })
      });
      if (res.status === 201) {
        alert('Category add ho gayi');
        router.push('/blogs/new'); // ya admin/categories list
      } else {
        const text = await res.text();
        alert('Error: ' + text);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Nayi Category Banayein</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Category ka naam"
          />
        </div>
        <div>
          <label className="block mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="URL-friendly slug (e.g. my-category)"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Saving...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
}
