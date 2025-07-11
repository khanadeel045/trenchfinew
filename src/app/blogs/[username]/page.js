// src/app/blogs/page.js (ya [username]/page.js)
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';
// import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function AllBlogsPage() {

      const user = await requireMembershipAccess('/blogs');
    
      if (!user) {
        return (
          <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
            ❌ Access denied. Upgrade your membership to view this page.
          </div>
        );
      }
    
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading blogs...</p>;
  }

  return (

    <>
      <Header />
        <div className="max-w-7xl mx-auto py-12 px-4 pt-30">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog Archive</h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(b => (
              <div
                key={b._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
              >
                {/* Image + Category Badge */}
                <div className="relative h-48">
                  {b.featureImage ? (
                    <img
                      src={b.featureImage.startsWith('/') ? b.featureImage : `/${b.featureImage}`}
                      alt={b.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  {b.category?.name && (
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {b.category.name}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col h-64">
                  <Link
                    href={`/blogs/${b.author.username}/${b.slug}`}
                    className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition mb-2"
                  >
                    {b.title}
                  </Link>
                  <p className="text-sm text-gray-500 mb-4">
                    by{' '}
                    <Link
                      href={`/blogs/${b.author.username}`}
                      className="font-medium text-gray-700 hover:underline"
                    >
                      {b.author.username}
                    </Link>
                  </p>
                  <p className="text-gray-700 flex-1 mb-4">
                    {b.content.length > 120
                      ? b.content.substring(0, 120) + '...'
                      : b.content}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/blogs/${b.author.username}/${b.slug}`}
                      className="inline-block text-indigo-600 font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination if needed */}
        </div>
      <Footer />
    </>
  );
}
